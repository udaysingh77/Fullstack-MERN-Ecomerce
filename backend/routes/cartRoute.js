import express from "express";
import * as cartController from "../controllers/cartController.js";
import { isAuhenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/", isAuhenticated, cartController.getcart);

router.post("/add", isAuhenticated, cartController.addTocart);

router.delete("/remove", isAuhenticated, cartController.removeFromCart);

router.put("/update ", isAuhenticated, cartController.updateQuantity);

export default router;
