import express from "express";
import { shopCreate } from "../controller/shopController";

const router = express.Router();

router.route("/create").post(shopCreate);

export default router;
