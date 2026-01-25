import express from "express";
import { signUp } from "../controller/authController";
import { login } from "../controller/loginController";

const router = express.Router();

router.route("/signUp").post(signUp);
router.route("/login").post(login);

export default router;
