import express from "express";
import * as productController from "../controllers/productcontroller.js";
import { isAdmin, isAuhenticated } from "../middleware/isAuthenticated.js";
import { multipleUpload } from "../middleware/multer.js";

const router = express.Router();

router.get("/all-products", productController.getAllProducts);

router.post("/add", isAuhenticated, isAdmin, multipleUpload, productController.addProducts);

router.delete("/delete/:productId", isAuhenticated, isAdmin, productController.deleteProduct);

router.put(
  "/update/:productId",
  isAuhenticated,
  isAdmin,
  multipleUpload,
  productController.updateProduct
);

export default router;
