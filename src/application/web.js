import express from "express";
import {errorMiddleware} from "../middleware/error.js";
import {userRouter} from "../route/api.js";

export const web = express();
web.use(express.json());

web.use(userRouter);
web.use(errorMiddleware);