import multer from "multer";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";
import { Router, Request, Response } from "express";

export const videoRouter2 = Router();

const upload = multer({ dest: "uploads/" });

const outputFolder = "converted/";
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

videoRouter2.post("/upload", upload.single("video"), (req: any, res: any) => {

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const inputFilePath = req.file.path;
  const outputFilePath = path.join(outputFolder, `${Date.now()}-converted.mp4`);

  console.log(inputFilePath, outputFilePath);

  res.json(({
    status: true
  }))

})
