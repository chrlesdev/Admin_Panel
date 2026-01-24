import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { verifyUserToken } from "./middleware/userToken";

import authRoute from "../src/routes/authRoute";
import shopRoute from "./routes/shopRoute";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // for cookies
  }),
);

app.use("/api/v1/", authRoute);
app.use("/api/v1/shop", verifyUserToken, shopRoute);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
