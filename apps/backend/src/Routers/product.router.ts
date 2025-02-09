import { Router, Request, Response } from "express";
import { createProductForStoreId, deleteproductByProductId, getAllProducts, getproductsByChannelPartnerId, getProductByProductId, getProductsByStoreId, getProductsByStoreName, getProductsByStoreSlug, updateProductByProductId, getProductsByRange, getProductsByRangeAndUserId } from "../db-functions/product-functions";
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

  let response: any;

  if(productId) {
    response = await getProductByProductId(productId);
  } else if(storeId) {
    response = await getProductsByStoreId(storeId);
  } else if(storeName) {
    response = await getProductsByStoreName(storeName);
  } else if(storeSlug) {
    response = await getProductsByStoreSlug(storeSlug);
  } else if(channelPartnerId) {
    response = await getproductsByChannelPartnerId(channelPartnerId)
  } else {
    response = await getAllProducts();
  }

  if(response.status) {
    res.status(200).json({
      status: true,
      data: response?.data,
      msg: "Product Information Fetched Successfully",
      msgFrom: "/api/v1/product"
    })

  } else {
    res.status(200).json({
      status: false,
      error: response?.error,
      msg: "Product Information Fetched Successfully",
      msgFrom: "/api/v1/product"
    })
  }
  
})

productRouter.get('/range', async (req: Request, res: Response) => {
  const startIndex = parseInt(req.query.startindex as string);
  const endIndex = parseInt(req.query.endindex as string);
  const limit = parseInt(req.query.limit as string);

  if(startIndex && endIndex && limit) {
    try {
      const response = await getProductsByRange(startIndex, endIndex, limit);

      if(response.status) {
        res.status(200).json({
          status: true,
          data: response?.data,
          msg: "Product fetched succesfully",
          msgFrom: "/api/v1/products/range"
        })

      } else {
        res.status(200).json({
          status: false,
          error: response?.error,
          msg: "Product fetched succesfully",
          msgFrom: "/api/v1/products/range"
        })
      }

    } catch(err) {
      res.status(200).json({
        status: false,
        msg: "some database error",
        msgFrom: "/api/v1/products/range"
      })
    }

  } else {
    res.status(200).json({
      status: false,
      msg: "invalid inputs",
      msgFrom: "/api/v1/products/range"
    })
  }
})

productRouter.get('/user-range', async (req: Request, res: Response) => {
  const startIndex = parseInt(req.query.startindex as string);
  const endIndex = parseInt(req.query.endindex as string);
  const limit = parseInt(req.query.limit as string);
  const userId = parseInt(req.query.userid as string);

  if(startIndex && endIndex && limit && userId) {
    try {
      const response = await getProductsByRangeAndUserId(startIndex, endIndex, limit, userId);

      if(response.status) {
        res.status(200).json({
          status: true,
          data: response?.data,
          msg: "Product fetched succesfully",
          msgFrom: "/api/v1/products/range"
        })

      } else {
        res.status(200).json({
          status: false,
          error: response?.error,
          msg: "Product fetched succesfully",
          msgFrom: "/api/v1/products/range"
        })
      }

    } catch(err) {
      res.status(200).json({
        status: false,
        msg: "some database error",
        msgFrom: "/api/v1/products/user-range"
      })
    }

  } else {
    res.status(200).json({
      status: false,
      msg: "invalid inputs",
      msgFrom: "/api/v1/products/range"
    })
  }
})

productRouter.post('/create', async(req: Request, res: Response) => {
  //http://localhost:5000/api/v1/product/create?storeid=1
  const storeId = parseInt(req.query.storeid as string);
  const productData = req.body;
  
  try {
    const response = await createProductForStoreId(productData, storeId);

    if(response.status) {
      res.status(200).json({
        status: true,
        data: response?.data,
        msg: "Product Created succesfully",
        msgFrom: "/api/v1/product/create"
      })

    } else {
      res.status(200).json({
        status: false,
        error: response?.error,
        msg: "Failed to Create Product",
        msgFrom: "/api/v1/product/create"
      })
    }


  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "Failed to create Product",
      msgFrom: "/api/v1/product/create",
      error: error
    })
  }
})

productRouter.put('/update', async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/product/update?productid=3

  try {
    const productId = parseInt(req.query.productid as string);
    const productData = req.body;

    if(productId) {
      const response = await updateProductByProductId(productData, productId)

      if(response.status) {
        res.status(200).json({
          status: true,
          data: response?.data,
          msg: "Product Updated succesfully",
          msgFrom: "/api/v1/product/update?productid"
        })
  
      } else {
        res.status(200).json({
          status: false,
          error: response?.error,
          msg: "Failed to update Product",
          msgFrom: "/api/v1/product/update?productid"
        })
      }

    } else {
      res.status(200).json({
        status: false,
        msg: "invalid input",
        msgFrom: "/api/v1/product/update"
      })
    }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some database error",
      error: error,
      msgFrom: "/api/v1/product/update"
    })
  }
})

productRouter.delete('/delete', async(req: Request, res: Response) => {
  //http://localhost:5000/api/v1/product/delete?productid=4

  try {
    const productId = parseInt(req.query.productid as string);

    if(productId) {
      const response = await deleteproductByProductId(productId);

      if(response.status) {
        res.status(200).json({
          status: true,
          data: response?.data,
          msg: "Product deleted succesfully",
          msgFrom: "/api/v1/product/delete?productid"
        })
  
      } else {
        res.status(200).json({
          status: false,
          error: response?.error,
          msg: "Failed to delete Product",
          msgFrom: "/api/v1/product/delete?productid"
        })
      }

    } else {
      res.json({
        status: "false",
        msg: "invalid inputs",
        msgFrom: "/api/v1/product/delete"
      })
    }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some database error",
      error: error,
      msgFrom: "/api/v1/product/delete"
    })
  }

})