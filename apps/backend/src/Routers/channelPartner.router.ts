import { Router, Request, Response } from "express";
import { getAllChannelPartners, getChannelPartnerByEmail, getChannelPartnerById, createChannelPartner, updateChannelPartnerforEmail,  updateChannelPartnerforId, deleteChannelPartnerByEmail, deleteChannelPartnerById } from "../db-functions/channel-partner-functions";

import { cpSignInAuth, generateCPJWT, validateCreateChannelPartner } from "./middlewares/channelPartner.mw";

export const channelPartnerRouter = Router();


channelPartnerRouter.get('/', async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/channel-partner
  //http://localhost:6000/api/v1/channel-partner?email=superadmin@gmail.com
  //http://localhost:6000/api/v1/channel-partner?id=3

  const email = req.query.email as string;
  const id = req.query.id as string;
  let data;
  let response;

  if(email) {
    response = await getChannelPartnerByEmail(email);
  } else if(id) {
    response = await getChannelPartnerById(parseInt(id));
  } else {
    response = await getAllChannelPartners();
  }

  if(response.status) {
    res.status(200).json({
      status: true,
      data: response.data,
      msgFrom: "/api/v1/channel-partner"
    })
  } else {
    res.status(200).json({
      status: false,
      msg: "Error Finding channelPartners",
      error: response?.error,
      msgFrom: "/api/v1/channel-partner/create"
    })
  }


  
})

channelPartnerRouter.post('/create', async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/channel-partner/create

  try {
    const response = await createChannelPartner(req.body);

    if(response?.error) {
      res.status(200).json({
        status: false,
        msg: response?.error,
        error: response?.error,
        msgFrom: "/api/v1/channel-partner/create"
      })

    } else {
      const { id, email, role } = response.data;
      const cpJWT = generateCPJWT({id, email, role});
      const data = response.data;

      res.status(200).json({
        status: true,
        data: {...data, cpJWT},
        msg: "Account Created Successfully",
        msgFrom: "/api/v1/channel-partner/create"
      })
    }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some error",
      error: error
    })
  }

  
})

//some error in logic, multile times response is getting sent
channelPartnerRouter.put('/update', async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/channel-partner/update?email=test@gmail.com
  //http://localhost:6000/api/v1/channel-partner/update?id=3
  try {
    const email = req.query.email as string;
    const id = req.query.id as string;

    let response: any;

    if(email) {
      response = await updateChannelPartnerforEmail({...req.body, "email": email})

    } else if (id) {
      response = await updateChannelPartnerforId({...req.body, "id": parseInt(id)})  

    } else {
      res.status(200).json({
        status: false,
        msg: "invalid input",
        msgFrom: "api/v1/chanel-partner/update"
      })
    }

    if(response.status) {
      res.status(200).json({
        status: true,
        data: response.data,
        msg: "Channel Partner Updated Successfully ",
        msgFrom: "api/v1/chanel-partner/update"
      })
    } else {
      res.status(200).json({
        status: false,
        error: response.error,
        msg: "Error While Updating Channel Partner",
        msgFrom: "api/v1/chanel-partner/update"
      })
    }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some error",
      error: error
    })
  }
})

channelPartnerRouter.delete('/delete', async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/channel-partner/delete?email=test@gmail.com
  //http://localhost:6000/api/v1/channel-partner/delete?id=4
  try {
    const email = req.query.email as string;
    const id = req.query.id as string;

    if(email) {
      const data = await deleteChannelPartnerByEmail(email);
      res.status(200).json({
        status: "true",
        data: data,
        msg: "api/v1/super-user/update/email"
      })

    } else if(id) {
      const data = await deleteChannelPartnerById(parseInt(id));

      res.status(200).json({
        status: "true",
        data: data,
        msg: "api/v1/super-user/update/id"
      })

    } else {
      res.status(200).json({
        status: false,
        msg: "invalid input"
      })
    }


  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some error",
      error: error
    })
  }

})

channelPartnerRouter.post('/signin', cpSignInAuth, async(req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    msg: "user signed in",
    msgFrom: "user Singed in"
  })
})