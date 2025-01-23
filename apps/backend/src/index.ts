import express, { Request, Response } from "express";
import { superadminRouter } from "./Routers/superadmin.router";
import { channelPartnerRouter } from "./Routers/channelPartner.router";
import { storeRouter } from "./Routers/store.router";
import { productRouter } from "./Routers/product.router";
import { userRouter } from "./Routers/userRoute";
import cors from "cors";

const app = express();
const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("API server started on port: ", PORT);
});

app.use(express.json());
app.use(cors());

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

app.get("/api/v1", (req: Request, res: Response) => {
  res.json({
    msg: "hello from home page",
  });
});

//using Routers
app.get("/", (req: Request, res: Response) => {
  res.json({
    msg: "welcome to homepage"
  })
})
app.use("/api/v1/super-admin", superadminRouter);
app.use("/api/v1/channel-partner", channelPartnerRouter);
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);
