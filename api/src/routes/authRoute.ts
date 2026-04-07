import express from "express";
import { signUp } from "../controller/auth/ownerSignUpController";
import { adminSignUp } from "../controller/auth/adminCreate";
import { loginAsOwner } from "../controller/auth/loginAsOwnerController";
import { loginAsAdmin } from "../controller/auth/LoginAsAdminController";
import { logoutOwner } from "../controller/auth/logoutOwnerControler";
import { logoutAdmin } from "../controller/auth/logoutAdminController";

const router = express.Router();

router.route("/signUp").post(signUp);
router.route("/adminSignUp").post(adminSignUp);
router.route("/ownerLogin").post(loginAsOwner);
router.route("/adminLogin").post(loginAsAdmin);
router.route("/logoutOwner").post(logoutOwner);
router.route("/logoutAdmin").post(logoutAdmin);

export default router;
