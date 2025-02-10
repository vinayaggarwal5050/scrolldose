import { Router, Request, Response } from "express";
import { createCategoryForStoreId, getAllCategories, getCategoryByCategoryId, getCategoryByStoreId, getCategoriesByChannelPartnerId, updateCategoryByCategoryId, deleteCategoryByCategoryId } from "../db-functions/categories-function"; 

export const categoryRouter = Router();

categoryRouter.get('/', async (req: Request, res: Response) => {
  //http://localhost:5000/api/v1/category
  //http://localhost:5000/api/v1/category?categoryid=1
  //http://localhost:5000/api/v1/category?storeid=3
  //http://localhost:5000/api/v1/category?channelpartnerid=4

  const categoryId = parseInt(req.query.categoryid as string);
  const storeId = parseInt(req.query.storeid as string);
  const channelPartnerId = parseInt(req.query.channelpartnerid as string);

  let response: any;

  try {
    if(categoryId) {
      response = await getCategoryByCategoryId(categoryId);
    } else if(storeId) {
      response = await getCategoryByStoreId(storeId);
    } else if(channelPartnerId) {
      response = await getCategoriesByChannelPartnerId(categoryId);
    } else {
      response = await getAllCategories();
    }

    if(response.status) {
      res.status(200).json({
        status: true,
        data: response?.data,
        msg: "All Categories Fetched Successfully For This Store!!!",
        msgFrom: "/api/v1/category"
      })
  
    } else {
      res.status(200).json({
        status: false,
        error: response?.error,
        msg: "Error While Fetching Categories",
        msgFrom: "/api/v1/category"
      })
    }

  } catch{
    res.status(200).json({
      status: false,
      msg: "Some Database Error",
      msgFrom: "/api/v1/category"
    })
  }
 
})

categoryRouter.post('/create', async(req: Request, res: Response) => {
  //http://localhost:5000/api/v1/category/create?storeid=1

  const storeId = parseInt(req.query.storeid as string);
  const categoryData = req.body;
  
  try {
    if(storeId) {
      const response = await createCategoryForStoreId(categoryData, storeId);

      if(response.status) {
        res.status(200).json({
          status: true,
          data: response?.data,
          msg: "Category Created succesfully",
          msgFrom: "/api/v1/category/create?storeid="
        })
  
      } else {
        res.status(200).json({
          status: false,
          error: response?.error,
          msg: "Failed to Create Category",
          msgFrom: "/api/v1/category/create?storeid="
        })
      }
  
    } else {
      res.status(200).json({
        status: false,
        msg: "Invalid input data",
        msgFrom: "/api/v1/category/create?storeid=",
      })
    }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "Failed to create category",
      msgFrom: "/api/v1/category/create?storeid=",
      error: error
    })
  }
})

categoryRouter.put('/update', async(req: Request, res: Response) => {
  //http://localhost:5000/api/v1/category/update?categoryid=3

  try {
    const categoryId = parseInt(req.query.categoryid as string);
    const categoryData = req.body;

    if(categoryId) {
      const response = await updateCategoryByCategoryId(categoryData, categoryId)

      if(response.status) {
        res.status(200).json({
          status: true,
          data: response?.data,
          msg: "Category Updated succesfully",
          msgFrom: "/api/v1/category/update?categoryid"
        })
  
      } else {
        res.status(200).json({
          status: false,
          error: response?.error,
          msg: "Failed to update Category",
          msgFrom: "/api/v1/category/update?categoryid"
        })
      }

    } else {
      res.status(200).json({
        status: false,
        msg: "invalid input",
        msgFrom: "/api/v1/category/update?categoryid"
      })
    }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some database error",
      error: error,
      msgFrom: "/api/v1/category/update?categoryid"
    })
  }
})

categoryRouter.delete('/delete', async(req: Request, res: Response) => {
  //http://localhost:5000/api/v1/category/update?categoryid=3

  try {
    const categoryId = parseInt(req.query.categoryid as string);

    if(categoryId) {
      const response = await deleteCategoryByCategoryId(categoryId);

      if(response.status) {
        res.status(200).json({
          status: true,
          data: response?.data,
          msg: "Category deleted succesfully",
          msgFrom: "/api/v1/cateogry/delete?categoryid"
        })
  
      } else {
        res.status(200).json({
          status: false,
          error: response?.error,
          msg: "Failed to delete Category",
          msgFrom: "/api/v1/cateogry/delete?categoryid"
        })
      }

    } else {
      res.json({
        status: "false",
        msg: "invalid inputs",
        msgFrom: "/api/v1/cateogry/delete?categoryid"
      })
    }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some database error",
      error: error,
      msgFrom: "/api/v1/cateogry/delete?categoryid"
    })
  }

})