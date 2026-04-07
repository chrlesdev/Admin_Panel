import express from "express";
import { signUp } from "../controller/auth/ownerSignUpController";
import { adminSignUp } from "../controller/auth/adminCreate";
import { loginAsOwner } from "../controller/auth/loginAsOwnerController";
// import {loginAsAdmin} from "../controller/auth/LoginAsAdminController"
// import { logout } from "../controller/auth/logoutController";

const router = express.Router();

router.route("/signUp").post(signUp);
router.route("/adminSignUp").post(adminSignUp);
router.route("/ownerLogin").post(loginAsOwner);
// router.route("/adminLogin").post(loginAsAdmin)
// router.route("/logout").post(logout);

export default router;
