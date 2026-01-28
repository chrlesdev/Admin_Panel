import express from "express";
import { signUp } from "../controller/authController";
import { login } from "../controller/loginController";
import { logout } from "../controller/logoutController";

const router = express.Router();

router.route("/signUp").post(signUp);
router.route("/login").post(login);
router.route("logout").post(logout);

export default router;
