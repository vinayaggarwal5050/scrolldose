"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const superadmin_router_1 = require("./Routers/superadmin.router");
const channelPartner_router_1 = require("./Routers/channelPartner.router");
const store_router_1 = require("./Routers/store.router");
const product_router_1 = require("./Routers/product.router");
const userRoute_1 = require("./Routers/userRoute");
const studio_router_1 = require("./Routers/studio.router");
const video_router_1 = require("./Routers/video.router");
const video2_router_1 = require("./Routers/video2.router");
const globalCategory_router_1 = require("./Routers/globalCategory.router");
const globalSubCategory_router_1 = require("./Routers/globalSubCategory.router");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)({
    origin: '*', // Try setting it to '*' for debugging, but restrict it later for security
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
}));
app.options('*', (0, cors_1.default)()); // Ensure OPTIONS requests are handled properly
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
/*
app.listen(PORT, "0.0.0.0", () => {
  console.log("API server started on port: ", PORT);
});

app.use(express.json());
app.use(cors());
*/
// app.use((req, res, next) => {
//   res.setHeader(
//     "Content-Security-Policy",
//     "connect-src 'self' http://localhost:6000"
//   );
//   next();
// });
// const corsOptions = {
//   origin: "http://localhost:8081",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };
// app.use(cors(corsOptions));
app.get("/api/v1", (req, res) => {
    res.json({
        msg: "hello from home page",
    });
});
//using Routers
app.get("/", (req, res) => {
    res.json({
        msg: "welcome to homepage"
    });
});
app.use("/api/v1/super-admin", superadmin_router_1.superadminRouter);
app.use("/api/v1/global-category", globalCategory_router_1.globalCategoryRouter);
app.use("/api/v1/global-sub-category", globalSubCategory_router_1.globalSubCategoryRouter);
app.use("/api/v1/channel-partner", channelPartner_router_1.channelPartnerRouter);
app.use("/api/v1/store", store_router_1.storeRouter);
app.use("/api/v1/product", product_router_1.productRouter);
app.use("/api/v1/user", userRoute_1.userRouter);
app.use("/api/v1/studio", studio_router_1.studioRouter);
app.use("/api/v1/video", video_router_1.videoRouter);
app.use('/api/v1/video2', video2_router_1.videoRouter2);
