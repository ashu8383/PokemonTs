"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({
            required_error: "User name is required",
        }),
        password: zod_1.z
            .string({ required_error: "Password is required" })
            .trim()
            .min(8, { message: "password must have at least 8 characters" }),
    }),
});
