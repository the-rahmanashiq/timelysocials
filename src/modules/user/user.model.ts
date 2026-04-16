import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  plan: { type: String, default: "free" },
  avatar: { type: String, default: "" },
  lastLogin: { type: Date, default: null },
});

// creating the model
const User = model<IUser>("User", userSchema);

export default User;
