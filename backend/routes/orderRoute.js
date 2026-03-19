import express from "express";
import { isAuhenticated } from "./../middleware/isAuthenticated.js";
import { createOrder, getMyOrder, verifyPayment } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create-order", isAuhenticated, createOrder);

router.post("/verify-payment", isAuhenticated, verifyPayment);

router.get("/myorder", isAuhenticated, getMyOrder);

export default router;
