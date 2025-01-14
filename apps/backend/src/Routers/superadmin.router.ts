import { Router, Request, Response } from "express";
import { SuperadminInference, createSuperadmin, getAllSuperadmin, getSuperadminByEmail, getSuperadminById } from "../db-functions/superadmin-functions";

export const superadminRouter = Router();


superadminRouter.get('/', async (req: Request, res: Response) => {
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

   res.json({
    status: true,
    data: data,
    msg: "/api/v1/super-admin"
  })
  
})

superadminRouter.post('/create', async(req: Request, res: Response) => {
  try {
    const data = await createSuperadmin(req.body);
    res.json({
      status: true,
      data: data,
      msg: "/api/v1/super-admin/create"
    })

  } catch(error) {
    res.json({
      status: false,
      msg: "some error",
      error: error
    })
  }


  
})

superadminRouter.put('/update', (req: Request, res: Response) => {

})