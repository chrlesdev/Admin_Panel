import express from "express";
import { productCreate } from "../controller/product_controller/productCreateController";
import { editProduct } from "../controller/product_controller/productEditController";
import { getProduct } from "../controller/product_controller/productGetController";
import { getAllProduct } from "../controller/product_controller/productGetAllController";

const router = express.Router();

router.route("/:shopId/allProduct").get(getAllProduct);
router.route("/:shopId/createProduct").post(productCreate);
router.route("/:shopId/:productId").get(getProduct);
router.route("/:shopId/:productId/editProduct").post(editProduct);
export default router;
