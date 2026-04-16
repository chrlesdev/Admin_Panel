import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { verifyOwnerToken } from "./middleware/userToken";

// import { verifyUserToken } from "./middleware/userToken";

import authRoute from "./routes/authRoute";
import adminRoute from "./routes/adminRoute";
import shopRoute from "./routes/shopRoute";
import ownerRoute from "./routes/ownerRoute";
import productRoute from "./routes/prouctRoute";
// import variantRoute from "./routes/variantRoute";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // for cookies
  }),
);

app.use("/api/v1/auth", authRoute);
app.use("api/v1/admin", verifyOwnerToken, adminRoute);
app.use("/api/v1/shop", verifyOwnerToken, shopRoute);
app.use("/api/v1/owner", verifyOwnerToken, ownerRoute);
app.use("/api/v1/product", verifyOwnerToken, productRoute);
// app.use("/api/v1/variant", verifyUserToken, variantRoute);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
