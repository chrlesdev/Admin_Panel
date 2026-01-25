import express from "express";
import { productCreate } from "../controller/product_controller/productCreateController";
import { editProduct } from "../controller/product_controller/productEditController";

const router = express.Router();

router.route("/:shopId/createProduct").post(productCreate);
router.route("/:shopID/:productId/editProduct").post(editProduct);

export default router;
