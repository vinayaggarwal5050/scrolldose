import express, { NextFunction, Request, Response, Router } from "express";
import cors from "cors";

const app = express();
const PORT = 7000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Backend started on PORT: ${PORT}`);
})

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    "status": true,
    "msg": "welcome to home page"
  })
})

app.get('/api/', (req: Request, res: Response) => {
  res.status(200).json({
    "status": true,
    "msg": "welcome to API page"
  })
})

app.get('/api/videos', (req: Request, res: Response) => {
  res.status(200).json({
    "status": true,
    "data": videos,
    "msg": "welcome to API page"
  })
})

app.get('/api/videos/:videoid', (req: Request, res: Response) => {
  const videoId = parseInt(req.params.videoid);
  const video = videos.find(video => video.id === videoId);

  if(video) {
    res.status(200).json({
      "status": true,
      "data": video,
      "msg": "video found succesfully"
    })
  } else {
    res.status(200).json({
      "status": false,
      "msg": "video not found"
    })
  }
})

const videos = [
  {
    "id": 1,
    "slug": "smart-sharpner",
    "rootPath": "/mnt/data-drive/mnt/data-drive/nginx-video-streamer/html/videos/"
  },
  {
    "id": 2,
    "slug": "astronaut-lamp",
    "rootPath": "/mnt/data-drive/mnt/data-drive/nginx-video-streamer/html/videos/"
  },
  {
    "id": 3,
    "slug": "kids-banana-shaped-umbrella",
    "rootPath": "/mnt/data-drive/mnt/data-drive/nginx-video-streamer/html/videos/"
  }

]

