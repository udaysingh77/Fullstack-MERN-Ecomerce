import express from 'express';
import * as userController from "../controllers/userController.js";

const routes = express.Router()

routes.post("/register",userController.register)

routes.get("/verify",userController.verify)

routes.post("/reVerify",userController.reVerify)

routes.post("/login",userController.login)

export default routes








