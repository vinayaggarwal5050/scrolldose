import { Router, Request, Response } from "express";
import { createGlobalSubCategory, getAllGlobalSubCategories, getGlobalSubCategoryByGlobalSubCategoryId, getGlobalSubCategoryForGlobalCategoryId, updateGlobalSubCategoryforId, deleteGlobalSubCategoryById } from "../db-functions/global-subcategory-functions";

export const globalSubCategoryRouter = Router();


globalSubCategoryRouter.get('/', async(req: Request, res: Response) => {
  //http://localhost:5000/api/v1/global-sub-category
  //http://localhost:5000/api/v1/global-sub-category?id=3
  //http://localhost:5000/api/v1/global-sub-category?globalcategoryid=3

  const globalSubCategoryId = parseInt(req.query.id as string);
  const globalCategoryId = parseInt(req.query.globalcategoryid as string);

  let response;
  try {

    if(globalSubCategoryId) {
      response = await getGlobalSubCategoryByGlobalSubCategoryId(globalSubCategoryId);
    } else if(globalCategoryId) {
      response = await getGlobalSubCategoryForGlobalCategoryId(globalCategoryId);
    } else {
      response = await getAllGlobalSubCategories();
    }

    if(response?.status) {
      res.status(200).json({
        status: true,
        data: response.data,
        msg: "Global Sub Category fetched successfully",
        msgFrom: "/api/v1/global-sub-category"
      })
  
    } else {
      res.status(200).json({
        status: false,
        msg: "Error Finding Global Sub Category",
        error: response?.error,
        msgFrom: "/api/v1/global-sub-category"
      })
    }
  
  } catch(error) {
    res.json({
      status: false,
      msg: "database error",
      msgFrom: "/api/v1/global-sub-category"
    })
  }
  
})



globalSubCategoryRouter.post('/create', async(req: Request, res: Response) => {

  //http://localhost:5000/api/v1/global-sub-category/create?globalcategoryid=2

  const globalCategoryId = parseInt(req.query.globalcategoryid as string);

  try {
    const response = await createGlobalSubCategory(req.body, globalCategoryId);

    if(response?.status) {
      res.status(200).json({
        status: true,
        data: response?.data,
        msg: "Global Sub Category Created Successfully",
        msgFrom: "/api/v1/global-sub-category/create"
      })

    } else {
      res.status(200).json({
        status: false,
        msg: "Error While creating Global Sub Category",
        error: response?.error,
        msgFrom: "/api/v1/global-sub-category/create"
      })
    }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some Database Error",
      msgFrom: "/api/v1/global-sub-category/create",
      error: error
    })
  }

})



globalSubCategoryRouter.put('/update', async(req: Request, res: Response) => {

  //http://localhost:5000/api/v1/global-sub-category/update?id=3

  try {

    const globalSubCategoryId = parseInt(req.query.id as string);

    const data = req.body;

    let response: any;
    
    if (globalSubCategoryId) {
      response = await updateGlobalSubCategoryforId(data, globalSubCategoryId);

      if(response?.status) {
        res.status(200).json({
          status: true,
          data: response?.data,
          msg: "Global Sub Category Updated Successfully ",
          msgFrom: "api/v1/global-sub-category/update"
        })
  
      } else {
        res.status(200).json({
          status: false,
          error: response?.error,
          msg: "Error While Updating Global Sub Category",
          msgFrom: "api/v1/global-sub-category/update"
        })
      }

    } else {
      res.status(200).json({
        status: false,
        msg: "invalid inputs",
        msgFrom: "api/v1/global-sub-category/update"
      })
    }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some database error",
      msgFrom: "/api/v1/global-sub-category/update",
      error: error
    })
  }
})


globalSubCategoryRouter.delete('/delete', async(req: Request, res: Response) => {

  //http://localhost:5000/api/v1/global-sub-category/delete?id=4

  try {
    const globalSubCategoryId = parseInt(req.query.id as string);

    if(globalSubCategoryId) {

      const response = await deleteGlobalSubCategoryById(globalSubCategoryId);

      if(response?.status) {
        res.status(200).json({
          status: true,
          data: response?.data,
          msg: "Global Sub Category Deleted Successfully",
          msgFrom: "api/v1/global-sub-category/delete?id"
        })

      } else {
        res.status(200).json({
          status: false,
          error: response?.error,
          msg: "Error while deleting Global Sub Category",
          msgFrom: "api/v1/global-sub-category/delete?id"
        })
      }

    } else {
      res.status(200).json({
        status: false,
        msg: "invalid input",
        msgFrom: "api/v1/global-sub-category/delete?id"
      })
    }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some database error",
      error: error,
      msgFrom: "api/v1/global-sub-category/delete?id"
    })
  }

})

