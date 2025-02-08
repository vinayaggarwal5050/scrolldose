import { Router, Request, Response } from "express";
import multer from "multer";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";
import { createVideoEntryForStudioId, deleteVideoEntryByVideoId, getAllVideoEnteries, getVideoEnteriesForStudioId, getVideoEntryByVideoId, getVideoEntryByVideoSlug, updateVideoByVideoId } from "../db-functions/video-functions";

export const videoRouter = Router();

videoRouter.post('/upload', async(req: Request, res: Response) => {

  //http://localhost:5000/api/v1/video/upload?studioid=1

  const studioId = parseInt(req.query.studioid as string);
  const videoData = req.body;
  const { title } = videoData;
  let response;
  
  try {

    if(studioId && title) {
      response = await createVideoEntryForStudioId(videoData, studioId);

      if(response.status) {
        res.status(200).json({
          status: true,
          data: response.data,
          msg: "Video Entry Created Succesfully",
          msgFrom: "/api/v1/video/create"
        })
      } else {
        res.status(200).json({
          status: false,
          error: response.error,
          msg: "Fail to Create Video Entry",
          msgFrom: "/api/v1/video/create"
        })
      }

    } else {
      res.status(200).json({
        status: false,
        msg: "Invalid Data",
        msgFrom: "/api/v1/video/create"
      })
    }



  } catch(err) {
    res.status(200).json({
      status: false,
      msg: "Fail to Create Video Entry",
      msgFrom: "/api/v1/video/"
    })
  }

})



videoRouter.get('/', async (req: Request, res: Response) => {
  //http://localhost:6000/api/v1/video
  //http://localhost:6000/api/v1/video?videoid=3
  //http://localhost:6000/api/v1/video?videoslug=my-new-video
  //http://localhost:6000/api/v1/video?studioid=3

  const videoId = parseInt(req.query.videoid as string);
  const videoSlug = req.query.videoslug as string;
  const studioId = parseInt(req.query.studioid as string);

  let response;

  try {
    
    if(videoId) {
      response = await getVideoEntryByVideoId(videoId);
    } else if(videoSlug) {
      response = await getVideoEntryByVideoSlug(videoSlug);
    } else if(studioId) {
      response = await getVideoEnteriesForStudioId(studioId);
    } else {
      response = await getAllVideoEnteries();
    }

    if(response.status) {
      res.status(200).json({
        status: true,
        data: response.data,
        msg: "Video Fetch Succesfully",
        msgFrom: "/api/v1/video/"
      })
    } else {
      res.status(200).json({
        status: false,
        error: response.error,
        msg: "Fail to Fetch Video",
        msgFrom: "/api/v1/video/"
      })
    }

  } catch(err) {
    res.status(200).json({
      status: false,
      msg: "Fail to Fetch Video",
      msgFrom: "/api/v1/video/"
    })
  }
  
})


videoRouter.put('/update', async(req: Request, res: Response) => {

  //http://localhost:5000/api/v1/video/update?videoid=3

  try {
    const videoId = parseInt(req.query.videoid as string);
    const videoData = req.body;
    let response;

    if(videoId) {
      response = await updateVideoByVideoId(videoData, videoId);

      if(response.status) {
        res.status(200).json({
          status: true,
          data: response.data,
          msg: "Video Entry Update Succesfully",
          msgFrom: "/api/v1/video/update"
        })
      } else {
        res.status(200).json({
          status: false,
          error: response.error,
          msg: "Fail to Update Video Entry",
          msgFrom: "/api/v1/video/update"
        })
      }

    } else {
      res.status(200).json({
        status: false,
        msg: "invalid input", 
        msgFrom: "/api/v1/video/update"
      })
    }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some error",
      error: error
    })
  }
})

videoRouter.delete('/delete', async(req: Request, res: Response) => {

  //http://localhost:6000/api/v1/video/delete?videoid=4

  try {
    const videoId = parseInt(req.query.videoid as string);

    const data = await deleteVideoEntryByVideoId(videoId);

    if(videoId) {
      res.status(200).json({
        status: "true",
        data: data,
        msg: "api/v1/video/delete?videoid="
      })
    } else {
      res.json({
        status: "false",
        msg: "invalid data"
      })
    }

  } catch(error) {
    res.status(200).json({
      status: false,
      msg: "some error",
      error: error
    })
  }

})