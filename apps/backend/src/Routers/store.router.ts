import { Router, Request, Response } from "express";
import { getAllStores, getStoreByStoreId, getStoreByChannelPartnerId, getStoreByChannelPartnerEmail, createStoreForChannelPartnerId, updateStoreForStoreId, deleteStoreById, updateStoreForChannelPartnerEmail, updateStoreForChannelPartnerId } from "../db-functions/store-functions";
import { validateCreateStore } from "./middlewares/store.mw";

export const storeRouter = Router();


storeRouter.get('/', async (req: Request, res: Response) => {
  //http://localhost:6000/api/v1/store
  //http://localhost:6000/api/v1/store?id=3
  //http://localhost:6000/api/v1/store?email=superadmin@gmail.com


  const channelPartnerEmail = req.query.channelpartneremail as string;
  const channelPartnerId = req.query.channelpartnerid as string;
  const storeId = req.query.storeid as string;
  let data;

  if(storeId) {
    data = await getStoreByStoreId(parseInt(storeId));
  } else if(channelPartnerEmail) {
    data = await getStoreByChannelPartnerEmail(channelPartnerEmail);
  } else if(channelPartnerId) {
    data = await getStoreByChannelPartnerId(parseInt(channelPartnerId))
  }
   else {
    data = await getAllStores();
  }

   res.status(200).json({
    status: true,
    data: data,
    msg: "/api/v1/stores"
  })
  
})

storeRouter.post('/create', validateCreateStore, async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/store/create?channelPartnerId=3
  const channelPartnerId = parseInt(req.query.channelpartnerid as string);
  const productData = req.body;
  
  try {
    const data = await createStoreForChannelPartnerId(productData, channelPartnerId);
    res.status(200).json({
      status: true,
      data: data,
      msg: "/api/v1/store/create"
    })

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some error",
      error: error
    })
  }

  
})

storeRouter.put('/update', async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/store/update?storeId=3
  //http://localhost:6000/api/v1/store/update?channelpartneremail=test@gmail.com
  //http://localhost:6000/api/v1/store/update?channelpartnerid=4


  try {
    const storeId = parseFloat(req.query.storeid as string);
    const channelPartnerId = parseFloat(req.query.channelpartnerid as string);
    const channelPartnerEmail = req.query.email as string;
    const storeData = req.body;


    if(storeId) {
      const data = await updateStoreForStoreId(storeData, storeId)
      res.status(200).json({
        status: "true",
        data: data,
        msg: "api/v1/store/update/storeId"
      })

    } else if (channelPartnerEmail) {
      const data = await updateStoreForChannelPartnerEmail(storeData, channelPartnerEmail)
      res.status(200).json({
        status: "true",
        data: data,
        msg: "api/v1/store/update/storeId"
      })
      
    } else if(channelPartnerId) {
      const data = await updateStoreForChannelPartnerId(storeData, channelPartnerId)
      res.status(200).json({
        status: "true",
        data: data,
        msg: "api/v1/store/update/storeId"
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

storeRouter.delete('/delete', async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/store/delete?id=4
  try {
    const storeId = parseInt(req.query.id as string);

      const data = await deleteStoreById(storeId);

      res.status(200).json({
        status: "true",
        data: data,
        msg: "api/v1/store/update/id"
      })



  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some error",
      error: error
    })
  }

})