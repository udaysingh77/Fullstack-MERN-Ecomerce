import express from "express";
import * as productController from "../controllers/productcontroller.js";
import { isAdmin, isAuhenticated } from "../middleware/isAuthenticated.js";
import { multipleUpload } from "../middleware/multer.js";

const router = express.Router();

router.get("/all-products", productController.getAllProducts);

router.post("/add", isAuhenticated, isAdmin, multipleUpload, productController.addProducts);

export default router;
