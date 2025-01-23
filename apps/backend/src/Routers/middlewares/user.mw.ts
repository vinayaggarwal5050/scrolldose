import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { getUserByUserEmail } from '../../db-functions/user-funtions';
import jwt from "jsonwebtoken";


const createUserSchema = z.object({
  userEmail: z.string().email('invalid email format'),
  userPasswod: z.string().min(3, 'Password must be at least 3 characters long'),
  userName: z.string().optional()
})

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    createUserSchema.safeParse(req.body);
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



export const userSignInAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { userEmail, userPassword } = req.body;
  
    if(!userEmail || !userPassword) {
      res.status(200).json({
        status: false,
        msg: "invalid data",
        msgFrom: "api/v1/user/signin/invalid-data"
      })
      return;
    }
  
    const userData:any = await getUserByUserEmail(userEmail);
  
    if(!userData) {
      res.status(200).json({
        status: false,
        msg: "User with Given Email Does Not Exists",
        msgFrom: "api/v1/user/signin/invalid-email"
      })
      return;
    }
  
    if(userData.userPassword !== userPassword) {
      res.status(200).json({
        status: false,
        msg: "Invalid Password",
        msgFrom: "api/v1/user/signin/invalid-password"
      })
      return;
    }

    const payload = {
      "userId": userData.userId,
      "userEmail": userData.userEmail
    }

    const userJWT = generateUserJWT(payload);

    res.status(200).json({
      status: true,
      data: {...userData, userJWT},
      msg: "Login Successful",
      msgFrom: "api/v1/user/signin/success"
    })
    
}

const USER_JWT_SECRET_KEY = "123";

const generateUserJWT = (payload: {"userId": string, "userEmail": string}): string => {

  const userJWT = jwt.sign(payload, USER_JWT_SECRET_KEY);
  return userJWT;
}

const verifyUserJWT = (userJWT: string): any => {
  try {
    const decoded = jwt.verify(userJWT, USER_JWT_SECRET_KEY);
    return decoded;

  } catch(error) {
    throw new Error('Invalid or expired token');
  }
}