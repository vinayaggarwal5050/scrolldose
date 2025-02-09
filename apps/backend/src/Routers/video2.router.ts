import multer from "multer";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";
import { Router, Request, Response } from "express";
import { createVideoEntryForStudioId } from "../db-functions/video-functions";

export const videoRouter2 = Router();

// Define directories
const uploadFolder = "./uploaded-videos/";

const outputFolder = path.join( "/usr/src/videos/");
console.log(outputFolder);

// Ensure directories exist
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder, { recursive: true });
if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder, { recursive: true });

// Configure Multer to save uploaded file with slug as filename
const storage = multer.diskStorage({
  destination: uploadFolder,
  filename: (req, file, cb) => {
    const { slug } = req.body;
    if (!slug) return cb(new Error("Slug is required"), "");
    cb(null, `${slug}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Upload Route (Only one file allowed)
videoRouter2.post("/upload", upload.single("video"), async (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).json({
      status: false,
      msg: "Video File Not Found",
      msgFrom: "/api/v1/video/create"
    });
  }

  const studioId = parseInt(req.query.studioid as string);
  const videoData = req.body;
  const { title, slug } = videoData;

  if (!studioId || !title || !slug) {
    return res.status(400).json({
      status: false,
      msg: "Studio Id, Title, or Slug not found",
      msgFrom: "/api/v1/video/create"
    });
  }

  const inputFilePath = req.file.path;
  const outputFilePath = path.join(outputFolder, `${slug}.mp4`);

  console.log(`Processing video: ${inputFilePath} -> ${outputFilePath}`);

  const filePath = `${outputFilePath}`;
  const url = `/videos/${slug}`;

  // Convert video to 480p MP4 (CBR 2 Mbps)
  ffmpeg(inputFilePath)
    .output(outputFilePath)
    .videoCodec("libx264")
    .size("854x480") // 480p resolution
    .videoBitrate("2000k") // 2 Mbps CBR
    .audioCodec("aac")
    .audioBitrate("128k")
    .on("end", async () => {
      try {
        fs.unlinkSync(inputFilePath); // Remove original file after conversion
        console.log("uploaded file deleted");

        // Save entry in the database **after** successful conversion
        const response = await createVideoEntryForStudioId( { ...videoData, "filePath": filePath, "url": url }, studioId);

        console.log("database entry created");

        res.json({
          status: true,
          msg: "Upload, Conversion successful & database entry created",
          data: response?.data
        });
      } catch (dbError) {
        console.error("Database entry failed:", dbError);
        res.status(500).json({
          error: "Video conversion succeeded, but database entry failed",
          msgFrom: "/api/v1/video/create"
        });
      }
    })
    .on("error", (err) => {
      console.error("FFmpeg error:", err);
      res.status(500).json({
        error: "Video conversion failed",
        msgFrom: "/api/v1/video/create"
      });
    })
    .run();
});