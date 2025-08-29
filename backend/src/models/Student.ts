import { Schema } from "mongoose";
import { User, IUser } from "./User";
import { IQuiz } from "./Quiz";
import { ICourse } from "./Course";

export interface IStudent extends IUser {
  gpa: number;
  year: number;
  courses: ICourse["_id"][];
}

const StudentSchema = new Schema<IStudent>({
  gpa: { type: Number, min: 0.0, max: 4.0 },
  year: { type: Number, min: 1, max: 5 },
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

export const Student = User.discriminator<IStudent>("Student", StudentSchema);
