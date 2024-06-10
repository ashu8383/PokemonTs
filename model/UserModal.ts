import mongoose, { Model, Schema } from "mongoose";
import { Iuser } from "../type/types";

const UserSchema: Schema<Iuser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String },
});

const UserModel: Model<Iuser> = mongoose.model<Iuser>("User", UserSchema);

export default UserModel;
