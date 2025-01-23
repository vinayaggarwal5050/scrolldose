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
const app = (0, express_1.default)();
const PORT = 6000;
app.listen(PORT, () => {
    console.log("API server started on port: ", PORT);
});
app.use(express_1.default.json());
app.get("/api/v1", (req, res) => {
    res.json({
        msg: "hello from home page",
    });
});
//using Routers
app.use("/api/v1/super-admin", superadmin_router_1.superadminRouter);
app.use("/api/v1/channel-partner", channelPartner_router_1.channelPartnerRouter);
app.use("/api/v1/store", store_router_1.storeRouter);
app.use("/api/v1/product", product_router_1.productRouter);
app.use("/api/v1/user", userRoute_1.userRouter);
