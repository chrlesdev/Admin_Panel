import express from "express";

import { adminSignUp } from "../controller/auth/adminCreate";

const router = express.Router();

router.route("/adminSignUp").post(adminSignUp);

export default router;
