import express from "express";
import { isAuhenticated } from './../middleware/isAuthenticated.js';
import {createOrder, verifyPayment} from "../controllers/orderController.js"

const router = express.Router();

router.post("/create-order",isAuhenticated,createOrder)

router.post("/verify-payment",isAuhenticated,verifyPayment)

export default router