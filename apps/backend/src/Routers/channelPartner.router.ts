import { Router, Request, Response } from "express";
import { getAllChannelPartners, getChannelPartnerByEmail, getChannelPartnerById, createChannelPartner, updateChannelPartnerforEmail,  updateChannelPartnerforId, deleteChannelPartnerByEmail, deleteChannelPartnerById } from "../db-functions/channel-partner-functions";

import { validateCreateChannelPartner } from "./middlewares/channelPartner.mw";

export const channelPartnerRouter = Router();


channelPartnerRouter.get('/', async (req: Request, res: Response) => {
  //http://localhost:6000/api/v1/channel-partner
  //http://localhost:6000/api/v1/channel-partner?email=superadmin@gmail.com
  //http://localhost:6000/api/v1/channel-partner?id=3

  const email = req.query.email as string;
  const id = req.query.id as string;
  let data;

  if(email) {
    data = await getChannelPartnerByEmail(email);
  } else if(id) {
    data = await getChannelPartnerById(parseInt(id));
  } else {
    data = await getAllChannelPartners();
  }

   res.status(200).json({
    status: true,
    data: data,
    msg: "/api/v1/channel-partner"
  })
  
})

channelPartnerRouter.post('/create', validateCreateChannelPartner, async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/channel-partner/create

  try {
    const data = await createChannelPartner(req.body);
    res.status(200).json({
      status: true,
      data: data,
      msg: "/api/v1/channel-partner/create"
    })

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some error",
      error: error
    })
  }

  
})

channelPartnerRouter.put('/update', async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/channel-partner/update?email=test@gmail.com
  //http://localhost:6000/api/v1/channel-partner/update?id=3
  try {
    const email = req.query.email as string;
    const id = req.query.id as string;

    if(email) {
      const data = await updateChannelPartnerforEmail({...req.body, "email": email})
      res.status(200).json({
        status: "true",
        data: data,
        msg: "api/v1/super-user/update/email"
      })

    } else if (id) {
      const data = await updateChannelPartnerforId({...req.body, "id": parseInt(id)})
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