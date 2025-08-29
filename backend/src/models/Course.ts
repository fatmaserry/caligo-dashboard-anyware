import { Schema, model, Document } from "mongoose";
import { IStudent } from "./Student";
import { IInstructor } from "./Instructor";
import { IQuiz } from "./Quiz";

export interface ICourse extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  instructor: IInstructor;
  quizzes: IQuiz["_id"][];
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: String,
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: "Instructor" },
    quizzes: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],
  },
  { timestamps: true }
);

export const Course = model<ICourse>("Course", CourseSchema);
