import express from "express";
// import { productCreate } from "../controller/product_controller/productCreateController";
// import { editProduct } from "../controller/product_controller/productEditController";
// import { getSingleProduct } from "../controller/product_controller/productGetSingleController";
import { getAllProduct } from "../controller/product_controller/productGetAllController";

const router = express.Router();

router.route("/:shopId/product").get(getAllProduct);
// router.route("/:shopId/createProduct").post(productCreate);
// router.route("/:shopId/:productId").get(getSingleProduct);
// router.route("/:shopId/:productId/editProduct").post(editProduct);
export default router;
