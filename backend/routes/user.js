import express from 'express';
import * as userController from "../controllers/userController.js";

const routes = express.Router()

routes.post("/register",userController.register)

routes.get("/verify-token",userController.verify)

export default routes








