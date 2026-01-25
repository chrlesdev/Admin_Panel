import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { verifyUserToken } from "./middleware/userToken";

import authRoute from "./routes/authRoute";
import loginRoute from "./routes/authRoute";
import shopRoute from "./routes/shopRoute";
import productRoute from "./routes/prouctRoute";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // for cookies
  }),
);

app.use("/api/v1", authRoute);
app.use("/api/v1/shop", verifyUserToken, shopRoute);
app.use("/api/v1/product", verifyUserToken, productRoute);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
