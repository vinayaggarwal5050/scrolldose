import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import fs from "fs";
import multer from "multer";
import path from "path";
const uploadDir = "./../product-images";
fs.mkdirSync(uploadDir, { recursive: true });

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${req.body.slug}-${Date.now() + "-" + file.originalname}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });

const createProductSchema = z.object({
  name: z.string().min(5, 'name must be at least 3 characters long'),
  description: z.string().optional(),
  price: z.string().optional(),
  image: z.string().optional(),
  link: z.string().optional(),
  slug: z.string().optional(),
  video: z.string().optional(),
  tag: z.string().optional()
})

export const validateCreateProduct = (req: Request, res: Response, next: NextFunction) => {
  try {
    createProductSchema.safeParse(req.body);
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

