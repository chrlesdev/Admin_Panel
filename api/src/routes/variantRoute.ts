import express from "express";
import { createVariant, getVariant } from "../controller/variant_controller/variantCreateController";

const router = express.Router();

router.route("/:shopId/:productId/create").post(createVariant);
router.route("/:shopId/:productId/:variantId").get(getVariant);

export default router;
