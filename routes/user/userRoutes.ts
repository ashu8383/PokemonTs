import express from "express";
import registration from "../../Controller/UserController/registration";
import loginController from "../../Controller/UserController/loginController";
import { validate } from "../../validation/validation";
import { loginSchema } from "../../validation/validationSchema";

const userRouter = express.Router();

userRouter.post("/register", validate(loginSchema), registration);
userRouter.post("/login", loginController);

export default userRouter;
