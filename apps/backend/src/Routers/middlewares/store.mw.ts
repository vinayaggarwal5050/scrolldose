import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';



const createStoreSchema = z.object({
  name: z.string().min(5, 'name must be at least 3 characters long'),
  slug: z.string().optional()
})

export const validateCreateStore = (req: Request, res: Response, next: NextFunction) => {
  try {
    createStoreSchema.safeParse(req.body);
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


