import { getOwner } from "../controller/user_controller/getUserProfile";
import express from "express";

const router = express.Router();

router.route("/user").get(getOwner);

export default router;
