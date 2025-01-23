import express, { Request, Response } from "express";
import { superadminRouter } from "./Routers/superadmin.router";
import { channelPartnerRouter } from "./Routers/channelPartner.router";
import { storeRouter } from "./Routers/store.router";
import { productRouter } from "./Routers/product.router";
import { userRouter } from "./Routers/userRoute";

const app = express();
const PORT = 6000;

app.listen(PORT, () => {
  console.log("API server started on port: ", PORT);
});

app.use(express.json());

app.get("/api/v1", (req: Request, res: Response) => {
  res.json({
    msg: "hello from home page",
  });
});

//using Routers
app.use("/api/v1/super-admin", superadminRouter);
app.use("/api/v1/channel-partner", channelPartnerRouter);
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);
