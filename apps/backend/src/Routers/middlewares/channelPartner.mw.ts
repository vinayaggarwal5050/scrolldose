import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';


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

