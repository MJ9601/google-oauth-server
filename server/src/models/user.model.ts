import { Schema, Document, model } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  username: string;
  picture?: string;
  createdAt: Date;
  updatedAt: Date;
  profileVerified: boolean;
}

const userSchema = new Schema(
  {
    email: { required: true, unique: true, type: String },
    username: { required: true, type: String },
    picture: { type: String },
    profileVerified: { type: String, default: false },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<UserDocument>("User", userSchema);

export default UserModel;
