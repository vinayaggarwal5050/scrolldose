"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 7000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(PORT, () => {
    console.log(`Backend started on PORT: ${PORT}`);
});
app.get('/', (req, res) => {
    res.status(200).json({
        "status": true,
        "msg": "welcome to home page"
    });
});
app.get('/api/', (req, res) => {
    res.status(200).json({
        "status": true,
        "msg": "welcome to API page"
    });
});
app.get('/api/videos', (req, res) => {
    res.status(200).json({
        "status": true,
        "data": videos,
        "msg": "welcome to API page"
    });
});
app.get('/api/videos/:videoid', (req, res) => {
    const videoId = parseInt(req.params.videoid);
    const video = videos.find(video => video.id === videoId);
    if (video) {
        res.status(200).json({
            "status": true,
            "data": video,
            "msg": "video found succesfully"
        });
    }
    else {
        res.status(200).json({
            "status": false,
            "msg": "video not found"
        });
    }
});
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
];
