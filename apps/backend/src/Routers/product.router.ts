import { Router, Request, Response } from "express";
import { createProductForStoreId, deleteproductByProductId, getAllProducts, getproductsByChannelPartnerId, getProductByProductId, getProductsByStoreId, getProductsByStoreName, getProductsByStoreSlug, updateProductByProductId } from "../db-functions/product-functions";
import { validateCreateProduct } from "./middlewares/product.mw";

export const productRouter = Router();


productRouter.get('/', async (req: Request, res: Response) => {
  //http://localhost:6000/api/v1/product
  //http://localhost:6000/api/v1/product?storeid=3
  //http://localhost:6000/api/v1/product?channelpartneremail=superadmin@gmail.com
  //http://localhost:6000/api/v1/product?channelpartnerid=2

  const productId = parseInt(req.query.productid as string);
  const storeId = parseInt(req.query.storeid as string);
  const storeName = req.query.storename as string;
  const storeSlug = req.query.storeslug as string;
  const channelPartnerId = parseInt(req.query.channelpartnerid as string);

  let data;

  if(productId) {
    data = await getProductByProductId(productId);
  } else if(storeId) {
    data = await getProductsByStoreId(storeId);
  } else if(storeName) {
    data = await getProductsByStoreName(storeName);
  } else if(storeSlug) {
    data = await getProductsByStoreSlug(storeSlug);
  } else if(channelPartnerId) {
    data = await getproductsByChannelPartnerId(channelPartnerId)
  } else {
    data = await getAllProducts();
  }

   res.status(200).json({
    status: true,
    data: data,
    msg: "/api/v1/products"
  })
  
})

productRouter.post('/create', async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/product/create?storeid=1
  const storeId = parseInt(req.query.storeid as string);
  const productData = req.body;
  
  try {
    const data = await createProductForStoreId(productData, storeId);
    res.status(200).json({
      status: true,
      data: data,
      msg: "/api/v1/product/create"
    })

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some error",
      error: error
    })
  }
})

productRouter.put('/update', async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/product/update?productid=3

  try {
    const productId = parseFloat(req.query.productid as string);
    const productData = req.body;

    if(productId) {
      const data = await updateProductByProductId(productData, productId)
      res.status(200).json({
        status: "true",
        data: data,
        msg: "api/v1/product/update?productid"
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

productRouter.delete('/delete', async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/product/delete?productid=4
  try {
    const productId = parseInt(req.query.productid as string);

    const data = await deleteproductByProductId(productId);

    if(productId) {
      res.status(200).json({
        status: "true",
        data: data,
        msg: "api/v1/product/delete?productid="
      })
    } else {
      res.json({
        status: "false",
        msg: "invalid data"
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