import { Document } from "mongoose";

export interface Iuser extends Document {
  name: string;
  username?: string;
  email: string;
  password: string;
  avtar: string;
  fullname: string;
  _id: string;
  token: string;
}
export interface JwtExpPayload {
  _id: string;
  iat: number;
  exp: number;
}

declare module "express-serve-static-core" {
  export interface Request {
    user: Iuser;
  }
}
