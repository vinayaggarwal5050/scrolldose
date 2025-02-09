import { Router, Request, Response } from "express";

import { createGlobalCategory, getAllGloalCategories, getGlobalCategoryByGlobalCategoryId, updateGlobalCategoryforId, deleteGlobalCategoryById } from "../db-functions/global-category-functions";


export const globalCategoryRouter = Router();


globalCategoryRouter.get('/', async(req: Request, res: Response) => {
  //http://localhost:5000/api/v1/global-category
  //http://localhost:5000/api/v1/global-category?id=3

  const globalCategoryId = parseInt(req.query.id as string);
  let response;
  try {

    if(globalCategoryId) {
      response = await getGlobalCategoryByGlobalCategoryId(globalCategoryId);
    } else {
      response = await getAllGloalCategories();
    }

    if(response.status) {
      res.status(200).json({
        status: true,
        data: response.data,
        msg: "Global Category fetched succefully",
        msgFrom: "/api/v1/global-category"
      })
  
    } else {
      res.status(200).json({
        status: false,
        msg: "Error Finding globalCategorys",
        error: response?.error,
        msgFrom: "/api/v1/global-category/create"
      })
    }
  
  } catch(error) {
    res.json({
      status: false,
      msg: "database error",
      msgFrom: "/api/v1/global-category"
    })
  }


  
})

globalCategoryRouter.post('/create', async(req: Request, res: Response) => {

  //http://localhost:5000/api/v1/global-category/create

  try {
    const response = await createGlobalCategory(req.body);

    if(response?.status) {
      res.status(200).json({
        status: true,
        data: response?.data,
        msg: "Global Category Created Successfully",
        msgFrom: "/api/v1/global-category/create"
      })

    } else {
      res.status(200).json({
        status: false,
        msg: "Error While creating Global Category",
        error: response?.error,
        msgFrom: "/api/v1/global-category/create"
      })
    }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some Database Error",
      msgFrom: "/api/v1/global-category/create",
      error: error
    })
  }

})


globalCategoryRouter.put('/update', async(req: Request, res: Response) => {

  //http://localhost:5000/api/v1/global-category/update?id=3

  try {

    const globalCategoryId = parseInt(req.query.id as string);

    const data = req.body;

    let response: any;
    
    if (globalCategoryId) {
      response = await updateGlobalCategoryforId(data, globalCategoryId);

      if(response?.status) {
        res.status(200).json({
          status: true,
          data: response?.data,
          msg: "Global Category Updated Successfully ",
          msgFrom: "api/v1/global-category/update"
        })
  
      } else {
        res.status(200).json({
          status: false,
          error: response?.error,
          msg: "Error While Updating Global Category",
          msgFrom: "api/v1/global-category/update"
        })
      }

    } else {
      res.status(200).json({
        status: false,
        msg: "invalid inputs",
        msgFrom: "api/v1/chanel-partner/update"
      })
    }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some database error",
      msgFrom: "/api/v1/global-category/update",
      error: error
    })
  }
})

globalCategoryRouter.delete('/delete', async(req: Request, res: Response) => {
  //http://localhost:5000/api/v1/global-category/delete?id=4
  try {
    const globalCategoryId = parseInt(req.query.id as string);

    if(globalCategoryId) {

      const response = await deleteGlobalCategoryById(globalCategoryId);

      if(response?.status) {
        res.status(200).json({
          status: true,
          data: response?.data,
          msg: "Global Category Deleted Successfully",
          msgFrom: "api/v1/global-category/delete?id"
        })

      } else {
        res.status(200).json({
          status: false,
          error: response?.error,
          msg: "Error while deleting Global Category",
          msgFrom: "api/v1/global-category/delete?id"
        })
      }

    } else {
      res.status(200).json({
        status: false,
        msg: "invalid input",
        msgFrom: "api/v1/global-category/delete?id"
      })
    }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some database error",
      error: error,
      msgFrom: "api/v1/global-category/delete?id"
    })
  }

})

