import express from "express";
import { productCreate } from "../controller/product_controller/productController";

const router = express.Router();

router.route("/:shopId/createProduct").post(productCreate);

export default router;
