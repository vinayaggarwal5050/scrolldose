import { Router, Request, Response } from "express";
import { createStudioForChannelPartnerId, getAllStudios, getStudioByStudioId, getStudioByChannelPartnerId, getStudioByChannelPartnerEmail, updateStudioForStudioId, deleteStudioById  } from "../db-functions/studio-functions";

export const studioRouter = Router();


studioRouter.get('/', async (req: Request, res: Response) => {
  //http://localhost:5000/api/v1/studio
  //http://localhost:5000/api/v1/studio?id=3
  //http://localhost:5000/api/v1/studio?email=superadmin@gmail.com


  const channelPartnerEmail = req.query.channelpartneremail as string;
  const channelPartnerId = req.query.channelpartnerid as string;
  const studioId = req.query.studioid as string;
  let response;

  if(studioId) {
    response = await getStudioByStudioId(parseInt(studioId));
  } else if(channelPartnerEmail) {
    response = await getStudioByChannelPartnerEmail(channelPartnerEmail);
  } else if(channelPartnerId) {
    response = await getStudioByChannelPartnerId(parseInt(channelPartnerId))
  }
   else {
    response = await getAllStudios();
  }

  if(response.status) {
    res.status(200).json({
      status: true,
      data: response.data,
      msg: "Studio Fetched Succesfully",
      msgFrom: "/api/v1/studio"
    })

  } else {
    res.status(200).json({
      status: false,
      error: response.error,
      msg: "Error in fetching Studio",
      msgFrom: "/api/v1/studio"
    })

  }
})


studioRouter.post('/create', async(req: Request, res: Response) => {
  //http://localhost:5000/api/v1/studio/create?channelpartnerid=3

  const channelPartnerId = parseInt(req.query.channelpartnerid as string);
  const studioData = req.body;
  // const { name, link } = studioData;

  if(channelPartnerId ) {
    try {
      const response = await createStudioForChannelPartnerId(studioData, channelPartnerId);
      if(response.status) {
        res.status(200).json({
          status: true,
          data: response.data,
          msg: "Studio Created Successfully!",
          msgFrom: "/api/v1/studio/create"
        })

      } else {
        res.status(200).json({
          status: false,
          msg: response?.error,
          error: response?.error,
          msgFrom: "/api/v1/studio/create"
        })

      }
  
    } catch(error) {
      res.status(200).json({
        status: false,
        msg: "some error",
        msgFrom: "/api/v1/studio/create",
        error: error
      })
    }

  } else {
    res.status(200).json({
      status: false,
      msg: "invalid data",
      msgFrom: "/api/v1/store/create"
    })
  }
})


studioRouter.put('/update', async(req: Request, res: Response) => {
  //http://localhost:5000/api/v1/studio/update?studioid=3

  try {
    const studioId = parseFloat(req.query.studioid as string);

    const studioData = req.body;

    let response: any;

    if(!studioId) {
      res.status(200).json({
        status: false,
        msg: "invalid input",
        msgFrom: "api/v1/studio/update?studioid"
      })

    } else {
      response = await updateStudioForStudioId(studioData, studioId)

      if(response.status) {
        res.status(200).json({
          status: true,
          data: response.data,
          msg: "Studio Updated Successfully",
          msgFrom: "api/v1/studio/update?studioid"
        })

      } else {
        res.status(200).json({
          status: false,
          error: response.error,
          msg: "Error While Updating Studio",
          msgFrom: "api/v1/store/update?studioid"
        })

      }
    }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some error",
      error: error,
      msgFrom: "api/v1/store/update?studioid"
    })
  }
})


studioRouter.delete('/delete', async(req: Request, res: Response) => {
  //http://localhost:5000/api/v1/store/delete?studioid=4

  try {

      const studioId = parseInt(req.query.studioid as string);

      const response = await deleteStudioById(studioId);

      if(response.status) {
        res.status(200).json({
          status: true,
          data: response.data,
          msg: "Studio Deleted Succesfully",
          msgFrom: "/api/v1/studio/delete"
        })

      } else {
        res.status(200).json({
          status: false,
          error: response.error,
          msg: "Error in Deleting Studio",
          msgFrom: "/api/v1/studio/delete"
        })
      }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some error",
      msgFrom: "/api/v1/studio/delete",
      error: error
    })
  }

})

