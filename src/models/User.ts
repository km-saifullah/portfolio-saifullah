import { Schema, models, model } from "mongoose";

export type UserRole = "admin";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin"], default: "admin" },
  },
  { timestamps: true },
);

export default models.User || model<IUser>("User", UserSchema);
