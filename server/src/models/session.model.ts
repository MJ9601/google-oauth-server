import { Schema, Document, model } from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionDocument extends Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionModel = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    valid: { default: true, type: Boolean },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const SessionModel = model<SessionDocument>("Session", sessionModel);

export default SessionModel;
