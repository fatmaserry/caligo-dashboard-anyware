import { Schema } from "mongoose";
import { User, IUser } from "./User";
import { IQuiz } from "./Quiz";
import { ICourse } from "./Course";

export interface IInstructor extends IUser {
  courses: ICourse["_id"][];
}

const InstructorSchema = new Schema<IInstructor>({
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

export const Instructor = User.discriminator<IInstructor>(
  "Instructor",
  InstructorSchema
);
