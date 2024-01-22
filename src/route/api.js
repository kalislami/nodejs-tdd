import express from "express";
import userController from "../controller/user-controller.js";
const userRouter = new express.Router();

userRouter.get('/', (req, res) => {
    res.status(200).json({
        data: "OK"
    });
})

// register API
userRouter.post('/api/user', userController.register)
userRouter.delete('/api/user', userController.remove)
userRouter.delete('/api/user/all', userController.removeAll)

// register API
userRouter.post('/api/user/login', userController.login)

// register API
userRouter.post('/api/user/login/oauth', userController.oauth)

export {
    userRouter
}