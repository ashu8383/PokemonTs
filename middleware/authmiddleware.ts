import jwt from "jsonwebtoken";
import User from "../model/UserModal";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { JwtExpPayload } from "../type/types";

const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        // console.log("Received Token:==>", token);

        // Verify the token
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtExpPayload;

        // console.log("Decoded Token:==>", decoded);

        // Find the user by ID
        const user = await User.findById(decoded._id);
        // console.log("Retrieved User:", user);

        if (user) {
          req.user = user;
          next();
        } else {
          res.status(401).json({ error: "User not found" });
        }
      } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ error: "Invalid or expired token" });
      }
    } else {
      res.status(401).json({ error: "No token found in request" });
    }
  }
);

export { authMiddleware };
