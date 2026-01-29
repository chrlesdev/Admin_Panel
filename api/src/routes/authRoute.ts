import express from "express";
import { signUp } from "../controller/auth/authController";
import { login } from "../controller/auth/loginController";
import { logout } from "../controller/auth/logoutController";

const router = express.Router();

router.route("/signUp").post(signUp);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;
