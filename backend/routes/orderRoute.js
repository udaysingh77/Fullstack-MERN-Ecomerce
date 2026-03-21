import express from "express";
import { isAdmin, isAuhenticated } from "./../middleware/isAuthenticated.js";
import {
  createOrder,
  getAllOrdersAdmin,
  getMyOrder,
  getSalesData,
  verifyPayment,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create-order", isAuhenticated, createOrder);

router.post("/verify-payment", isAuhenticated, verifyPayment);

router.get("/myorder", isAuhenticated, getMyOrder);

router.get("/all", isAuhenticated, isAdmin, getAllOrdersAdmin);

router.get("/user-order/:userId", isAuhenticated, isAdmin, getMyOrder);

router.get("/sales", isAuhenticated, isAdmin, getSalesData);

export default router;
