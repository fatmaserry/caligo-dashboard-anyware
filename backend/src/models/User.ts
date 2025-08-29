import { Schema, model, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  image_url?: string;
  email: string;
  title: string;
  dob: Date;
  department: string;
  enrolledDate: Date;
  role: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    image_url: String,
    email: { type: String, required: true, unique: true },
    title: String,
    dob: { type: Date, required: true },
    department: { type: String, required: true },
    enrolledDate: { type: Date, default: Date.now },
    role: { type: String, required: true },
  },
  { discriminatorKey: "role", timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
