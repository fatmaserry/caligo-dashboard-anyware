import { Schema, model, Document } from "mongoose";
import { ICourse } from "./Course";

export interface IQuestion {
  text: string;
  options: string[];
  correctIndex: number;
  mark?: number;
}

const QuestionSchema = new Schema<IQuestion>({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  correctIndex: { type: Number, required: true },
  mark: { type: Number, default: 1, min: 0, max: 100, required: true },
});

export interface IQuiz extends Document {
  title: string;
  topic?: string;
  description?: string;
  semester: string;
  course: ICourse["_id"];
  totalMarks: number;
  questions: IQuestion[];
  deadline: Date;
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
}

const QuizSchema = new Schema<IQuiz>({
  title: { type: String, required: true },
  topic: String,
  description: String,
  semester: String,
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  totalMarks: { type: Number, min: 0 },
  questions: [QuestionSchema],
  deadline: Date,
  createdBy: { type: Schema.Types.ObjectId, ref: "Instructor", required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Quiz = model<IQuiz>("Quiz", QuizSchema);
