import { Router, Request, Response } from "express";
import { createProductForCategoryIdAndGlobalSubCategoryId, deleteproductByProductId, getAllProducts, getProductByProductId, getProductsByCategoryId, getProductsByGlobalSubCategoryId, getProductsByStoreId, getProductsByStoreSlug, updateProductByProductId, getProductsByRange, getProductsByRangeForSubCategoryId, getProductsByRangeAndUserId } from "../db-functions/product-functions";
// import { validateCreateProduct } from "./middlewares/product.mw";

export const productRouter = Router();

productRouter.get('/', async (req: Request, res: Response) => {
  //http://localhost:5000/api/v1/product
  //http://localhost:5000/api/v1/product?productid=3
  //http://localhost:5000/api/v1/product?categoryid=1
  //http://localhost:5000/api/v1/product?globalsubcategoryid=1
  //http://localhost:5000/api/v1/product?storeid=3
  //http://localhost:5000/api/v1/product?storeslug=my-store


  const productId = parseInt(req.query.productid as string);
  const categoryId = parseInt(req.query.categoryid as string);
  const globalSubCategoryId = parseInt(req.query.globalsubcategoryid as string);
  const storeId = parseInt(req.query.storeid as string);
  const storeSlug = req.query.storeslug as string;

  let response: any;

  try {
    if(productId) {
      response = await getProductByProductId(productId);
    } else if(storeId) {
      response = await getProductsByStoreId(storeId);
    } else if(categoryId) {
      response = await getProductsByCategoryId(categoryId);
    } else if(globalSubCategoryId) {
      response = await getProductsByGlobalSubCategoryId(globalSubCategoryId);
    } else if(storeSlug) {
      response = await getProductsByStoreSlug(storeSlug);
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

  } catch{
    res.status(200).json({
      status: false,
      msg: "Some Database Error",
      msgFrom: "/api/v1/product"
    })
  }
 
})

productRouter.get('/range', async (req: Request, res: Response) => {

  const startIndex = parseInt(req.query.startindex as string);
  const endIndex = parseInt(req.query.endindex as string);
  const limit = parseInt(req.query.limit as string);
  const globalSubCategoryId = parseInt(req.query.globalSubCategoryId as string);


  try {
    let response;

    if(startIndex && endIndex && limit) {
      response = await getProductsByRange(startIndex, endIndex, limit);

    } else if(startIndex && endIndex && limit && globalSubCategoryId) {
      response = await getProductsByRangeForSubCategoryId(startIndex, endIndex, limit, globalSubCategoryId);

    } else {
      res.status(200).json({
        status: false,
        msg: "invalid inputs",
        msgFrom: "/api/v1/products/range"
      })
    }

    if(response?.status) {
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
  //http://localhost:5000/api/v1/product/create
  let productData = req.body;

  const { categoryId, globalSubCategoryId, name, slug, price, videoId, stock, isAffiliateLink } = productData;

  productData = {
    ...productData,
    "categoryId": parseInt(categoryId),
    "globalSubCategoryId": parseInt(globalSubCategoryId),
    "videoId": parseInt(videoId),
    "price": parseInt(price),
    "stock": parseInt(stock),
    "isAffiliateLink": (isAffiliateLink === 'true') ? true : false
  }
  
  console.log(productData);


  if(categoryId && globalSubCategoryId && name && slug) {
    
    try {
      // const response = {"status": true, "data": 124, "error": "some-error"} 
      const response = await createProductForCategoryIdAndGlobalSubCategoryId(productData);
  
      if(response?.status) {
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
        msg: "Some database error",
        msgFrom: "/api/v1/product/create",
        error: error
      })
    }

  } else {
    res.status(200).json({
      status: false,
      msg: "invalid inputs",
      msgFrom: "/api/v1/product/create",
    })
  }
  
})

productRouter.put('/update', async(req: Request, res: Response) => {
  //http://localhost:5000/api/v1/product/update?productid=3

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