import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import userController from "../controller/user-controller.js";

const privateRouter = new express.Router();
privateRouter.use(authMiddleware);

// logout API
userRouter.delete('/api/user/logout', userController.logout)

export {
    privateRouter
}