"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registration_1 = __importDefault(require("../Controller/UserController/registration"));
const loginController_1 = __importDefault(require("../Controller/UserController/loginController"));
const validation_1 = require("../validation/validation");
const validationSchema_1 = require("../validation/validationSchema");
const userRouter = express_1.default.Router();
userRouter.post("/register", (0, validation_1.validate)(validationSchema_1.loginSchema), registration_1.default);
userRouter.post("/login", loginController_1.default);
exports.default = userRouter;
