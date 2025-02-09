"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter2 = void 0;
const multer_1 = __importDefault(require("multer"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const express_1 = require("express");
const video_functions_1 = require("../db-functions/video-functions");
exports.videoRouter2 = (0, express_1.Router)();
// Define directories
const uploadFolder = "./uploaded-videos/";
const outputFolder = path_1.default.join("/usr/src/videos/");
console.log(outputFolder);
// Ensure directories exist
if (!fs_1.default.existsSync(uploadFolder))
    fs_1.default.mkdirSync(uploadFolder, { recursive: true });
if (!fs_1.default.existsSync(outputFolder))
    fs_1.default.mkdirSync(outputFolder, { recursive: true });
// Configure Multer to save uploaded file with slug as filename
const storage = multer_1.default.diskStorage({
    destination: uploadFolder,
    filename: (req, file, cb) => {
        const { slug } = req.body;
        if (!slug)
            return cb(new Error("Slug is required"), "");
        cb(null, `${slug}${path_1.default.extname(file.originalname)}`);
    },
});
const upload = (0, multer_1.default)({ storage });
// Upload Route (Only one file allowed)
exports.videoRouter2.post("/upload", upload.single("video"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).json({
            status: false,
            msg: "Video File Not Found",
            msgFrom: "/api/v1/video/create"
        });
    }
    const studioId = parseInt(req.query.studioid);
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
    const outputFilePath = path_1.default.join(outputFolder, `${slug}.mp4`);
    console.log(`Processing video: ${inputFilePath} -> ${outputFilePath}`);
    const filePath = `${outputFilePath}`;
    const url = `/videos/${slug}`;
    // Convert video to 480p MP4 (CBR 2 Mbps)
    (0, fluent_ffmpeg_1.default)(inputFilePath)
        .output(outputFilePath)
        .videoCodec("libx264")
        .size("854x480") // 480p resolution
        .videoBitrate("2000k") // 2 Mbps CBR
        .audioCodec("aac")
        .audioBitrate("128k")
        .on("end", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            fs_1.default.unlinkSync(inputFilePath); // Remove original file after conversion
            console.log("uploaded file deleted");
            // Save entry in the database **after** successful conversion
            const response = yield (0, video_functions_1.createVideoEntryForStudioId)(Object.assign(Object.assign({}, videoData), { "filePath": filePath, "url": url }), studioId);
            console.log("database entry created");
            res.json({
                status: true,
                msg: "Upload, Conversion successful & database entry created",
                data: response === null || response === void 0 ? void 0 : response.data
            });
        }
        catch (dbError) {
            console.error("Database entry failed:", dbError);
            res.status(500).json({
                error: "Video conversion succeeded, but database entry failed",
                msgFrom: "/api/v1/video/create"
            });
        }
    }))
        .on("error", (err) => {
        console.error("FFmpeg error:", err);
        res.status(500).json({
            error: "Video conversion failed",
            msgFrom: "/api/v1/video/create"
        });
    })
        .run();
}));
