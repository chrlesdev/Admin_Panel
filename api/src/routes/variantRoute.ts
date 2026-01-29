import express from "express";
import { createVariant } from "../controller/variant_controller/variantCreateController";
import { getSingleVariant } from "../controller/variant_controller/variantGetSingleController";
const router = express.Router();

router.route("/:shopId/:productId/create").post(createVariant);
router.route("/:shopId/:productId/:variantId").get(getSingleVariant);

export default router;
