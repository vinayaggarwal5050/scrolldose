import { Router, Request, Response } from "express";
import { createSuperadmin, getAllSuperadmin, getSuperadminByEmail, getSuperadminById, deleteSuperUserById, deleteSuperUserByEmail, updateSuperadmintforEmail, updateSuperadmintforId } from "../db-functions/superadmin-functions";
import { validateCreateSuperuser } from "./middlewares/superadmin.mw";

export const superadminRouter = Router();


superadminRouter.get('/', async (req: Request, res: Response) => {
  //http://localhost:6000/api/v1/super-admin
  //http://localhost:6000/api/v1/super-admin?email=superadmin@gmail.com
  //http://localhost:6000/api/v1/super-admin?id=3

  const email = req.query.email as string;
  const id = req.query.id as string;
  let data;

  if(email) {
    data = await getSuperadminByEmail(email);
  } else if(id) {
    data = await getSuperadminById(parseInt(id));
  } else {
    data = await getAllSuperadmin();
  }

   res.status(200).json({
    status: true,
    data: data,
    msg: "/api/v1/super-admin"
  })
  
})

superadminRouter.post('/create', validateCreateSuperuser, async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/super-admin/create

  try {
    const data = await createSuperadmin(req.body);
    res.status(200).json({
      status: true,
      data: data,
      msg: "/api/v1/super-admin/create"
    })

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some error",
      error: error
    })
  }

  
})

superadminRouter.put('/update', async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/super-admin/update?email=test@gmail.com
  //http://localhost:6000/api/v1/super-admin/update?id=3
  try {
    const email = req.query.email as string;
    const id = req.query.id as string;

    if(email) {
      const data = await updateSuperadmintforEmail({...req.body, "email": email})
      res.status(200).json({
        status: "true",
        data: data,
        msg: "api/v1/super-user/update/email"
      })

    } else if (id) {
      const data = await updateSuperadmintforId({...req.body, "id": parseInt(id)})
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

superadminRouter.delete('/delete', async(req: Request, res: Response) => {
  //http://localhost:6000/api/v1/super-admin/delete?email=test@gmail.com
  //http://localhost:6000/api/v1/super-admin/delete?id=4
  try {
    const email = req.query.email as string;
    const id = req.query.id as string;

    if(email) {
      const data = await deleteSuperUserByEmail(email);
      res.status(200).json({
        status: "true",
        data: data,
        msg: "api/v1/super-user/update/email"
      })

    } else if(id) {
      const data = await deleteSuperUserById(parseInt(id));

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