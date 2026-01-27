import express from "express";
import * as userController from "../controllers/userController.js";
import { isAuhenticated, isAdmin } from "../middleware/isAuthenticated.js";

const routes = express.Router();

routes.post("/register", userController.register);

routes.get("/verify", userController.verify);

routes.post("/reVerify", userController.reVerify);

routes.post("/login", userController.login);

routes.post("/logout", isAuhenticated, userController.logout);

routes.post("/forgot-password", userController.forgotPassword);

routes.post("/verify-otp/:email", userController.verifyOtp);

routes.post("/changed-password/:email", userController.changedPassword);

routes.get("/all-users", isAuhenticated, isAdmin, userController.allUsers);

routes.get("/get-user/:email", userController.userById);

export default routes;
