import express from "express";
import { createShop } from "../controller/shop_controller/shopCreateController";
import { editShop } from "../controller/shop_controller/shopEditController";
import { deleteShop } from "../controller/shop_controller/shopDeleteController";

const router = express.Router();

router.route("/create").post(createShop);
router.route("/:shopId/edit").post(editShop);
router.route("/:shopId/delete").post(deleteShop);

export default router;
