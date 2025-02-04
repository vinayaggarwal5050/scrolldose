import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import jwt from "jsonwebtoken";
import { getChannelPartnerByEmail } from '../../db-functions/channel-partner-functions';


const createChannelPartnerSchema = z.object({
  email: z.string().email('invalid email format'),
  password: z.string().min(3, 'Password must be at least 3 characters long'),
  name: z.string().optional()
})

export const validateCreateChannelPartner = (req: Request, res: Response, next: NextFunction) => {
  try {
    createChannelPartnerSchema.parse(req.body);
    next();

  } catch(error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        status: false,
        errors: error.errors.map((err) => ({
          field: err.path[0], // Field name causing the error
          message: err.message, // Error message
        })),
      });
    }
  }

  res.status(400).json({
    status: false,
    message: "some schema exception"
  })

}

const CP_JWT_SECRET_KEY = "123";

export const generateCPJWT = (payload: {"id": number, "email": string, "role": string}): string => {

  const cpJWT = jwt.sign(payload, CP_JWT_SECRET_KEY);
  return cpJWT;
}

const verifyCPJWT = (cpJWT: string): any => {
  try {
    const decoded = jwt.verify(cpJWT, CP_JWT_SECRET_KEY);
    return decoded;

  } catch(error) {
    throw new Error('Invalid or expired token');
  }
}


export const cpSignInAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
  
    if(!email || !password) {
      res.status(200).json({
        status: false,
        msg: "invalid data",
        msgFrom: "api/v1/channel-partner/signin/invalid-data"
      })
      return;
    }
  
    const response = await getChannelPartnerByEmail(email);
    const cpData = response.data;
  
    if(!cpData) {
      res.status(200).json({
        status: false,
        msg: "Channel Partner with Given Email Does Not Exists",
        msgFrom: "api/v1/channel-partner/signin/invalid-email"
      })
      return;
    }
  
    if(cpData.password !== password) {
      res.status(200).json({
        status: false,
        msg: "Invalid Password",
        msgFrom: "api/v1/channel-partner/signin/invalid-email"
      })
      return;
    }

    const payload = {
      "id": cpData.id,
      "email": cpData.email,
      "role": cpData.role
    }

    const cpJWT = generateCPJWT(payload);

    res.status(200).json({
      status: true,
      data: {...cpData, cpJWT},
      msg: "Login Successful",
      msgFrom: "api/v1/channel-partner/signin/success"
    })
    
}