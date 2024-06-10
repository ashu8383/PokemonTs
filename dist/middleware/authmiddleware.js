"use strict";
// import jwt from "jsonwebtoken";
// import User from "../model/UserModal";
// import { Request, Response, NextFunction } from "express";
// import asyncHandler from "express-async-handler";
// import { JwtExpPayload } from "../type/types";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
// const authMiddleware = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     let token;
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       try {
//         token = req.headers.authorization.split(" ")[1];
//         const decoded = jwt.verify(
//           token,
//           process.env.JWT_SECRET as string
//         ) as JwtExpPayload;
//         const user = await User.findById(decoded.id);
//         if (user) {
//           req.user = user;
//           next();
//         } else {
//           res.status(401).json({ data: { error: "User not found" } });
//         }
//       } catch (error) {
//         res.status(401).json({ data: { error: "Invalid or expired token" } });
//       }
//     } else {
//       res.status(401).json({ data: { error: "No token found in request" } });
//     }
//   }
// );
// export { authMiddleware };
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModal_1 = __importDefault(require("../model/UserModal"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const authMiddleware = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = yield UserModal_1.default.findById(decoded.id);
            if (user) {
                req.user = user;
                next();
            }
            else {
                res.status(401).json({ data: { error: "User not found" } });
            }
        }
        catch (error) {
            res.status(401).json({ data: { error: "Invalid or expired token" } });
        }
    }
    else {
        res.status(401).json({ data: { error: "No token found in request" } });
    }
}));
exports.authMiddleware = authMiddleware;
