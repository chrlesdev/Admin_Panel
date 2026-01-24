import express from "express";
import { signUp } from "../controller/authController";

const router = express.Router();

router.route("/signUp").post(signUp);

export default router;
