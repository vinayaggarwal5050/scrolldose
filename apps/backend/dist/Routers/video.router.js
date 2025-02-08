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
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const express_1 = require("express");
const video_functions_1 = require("../db-functions/video-functions");
exports.videoRouter = (0, express_1.Router)();
exports.videoRouter.post('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/video/upload?studioid=1
    const studioId = parseInt(req.query.studioid);
    const videoData = req.body;
    const { title } = videoData;
    let response;
    try {
        if (studioId && title) {
            response = yield (0, video_functions_1.createVideoEntryForStudioId)(videoData, studioId);
            if (response.status) {
                res.status(200).json({
                    status: true,
                    data: response.data,
                    msg: "Video Entry Created Succesfully",
                    msgFrom: "/api/v1/video/create"
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    error: response.error,
                    msg: "Fail to Create Video Entry",
                    msgFrom: "/api/v1/video/create"
                });
            }
        }
        else {
            res.status(200).json({
                status: false,
                msg: "Invalid Data",
                msgFrom: "/api/v1/video/create"
            });
        }
    }
    catch (err) {
        res.status(200).json({
            status: false,
            msg: "Fail to Create Video Entry",
            msgFrom: "/api/v1/video/"
        });
    }
}));
exports.videoRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/video
    //http://localhost:6000/api/v1/video?videoid=3
    //http://localhost:6000/api/v1/video?videoslug=my-new-video
    //http://localhost:6000/api/v1/video?studioid=3
    const videoId = parseInt(req.query.videoid);
    const videoSlug = req.query.videoslug;
    const studioId = parseInt(req.query.studioid);
    let response;
    try {
        if (videoId) {
            response = yield (0, video_functions_1.getVideoEntryByVideoId)(videoId);
        }
        else if (videoSlug) {
            response = yield (0, video_functions_1.getVideoEntryByVideoSlug)(videoSlug);
        }
        else if (studioId) {
            response = yield (0, video_functions_1.getVideoEnteriesForStudioId)(studioId);
        }
        else {
            response = yield (0, video_functions_1.getAllVideoEnteries)();
        }
        if (response.status) {
            res.status(200).json({
                status: true,
                data: response.data,
                msg: "Video Fetch Succesfully",
                msgFrom: "/api/v1/video/"
            });
        }
        else {
            res.status(200).json({
                status: false,
                error: response.error,
                msg: "Fail to Fetch Video",
                msgFrom: "/api/v1/video/"
            });
        }
    }
    catch (err) {
        res.status(200).json({
            status: false,
            msg: "Fail to Fetch Video",
            msgFrom: "/api/v1/video/"
        });
    }
}));
exports.videoRouter.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/api/v1/video/update?videoid=3
    try {
        const videoId = parseInt(req.query.videoid);
        const videoData = req.body;
        let response;
        if (videoId) {
            response = yield (0, video_functions_1.updateVideoByVideoId)(videoData, videoId);
            if (response.status) {
                res.status(200).json({
                    status: true,
                    data: response.data,
                    msg: "Video Entry Update Succesfully",
                    msgFrom: "/api/v1/video/update"
                });
            }
            else {
                res.status(200).json({
                    status: false,
                    error: response.error,
                    msg: "Fail to Update Video Entry",
                    msgFrom: "/api/v1/video/update"
                });
            }
        }
        else {
            res.status(200).json({
                status: false,
                msg: "invalid input",
                msgFrom: "/api/v1/video/update"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some error",
            error: error
        });
    }
}));
exports.videoRouter.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:6000/api/v1/video/delete?videoid=4
    try {
        const videoId = parseInt(req.query.videoid);
        const data = yield (0, video_functions_1.deleteVideoEntryByVideoId)(videoId);
        if (videoId) {
            res.status(200).json({
                status: "true",
                data: data,
                msg: "api/v1/video/delete?videoid="
            });
        }
        else {
            res.json({
                status: "false",
                msg: "invalid data"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            status: false,
            msg: "some error",
            error: error
        });
    }
}));
