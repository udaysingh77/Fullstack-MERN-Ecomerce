import express from 'express';
import * as userController from "../controllers/userController.js";

const routes = express.Router()

routes.post("/create",userController.createUser)

export default routes








