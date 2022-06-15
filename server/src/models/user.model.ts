import { Schema, Document, model } from "mongoose";
import config from "config";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  email: string;
  username: string;
  password: string;
  picture?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    email: { required: true, unique: true, type: String },
    username: { required: true, type: String },
    pasword: { required: true, type: String },
    picture: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(config.get<number>("numberOfSalt"));
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  return next();
});

userSchema.methods.comparePass = async function (
  passwordInReq: string
): Promise<boolean> {
  const user = this as UserDocument;

  return await bcrypt
    .compare(passwordInReq, user.password)
    .catch((err) => false);
};

const UserModel = model<UserDocument>("User", userSchema);

export default UserModel;
