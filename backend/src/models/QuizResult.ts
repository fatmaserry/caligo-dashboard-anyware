import { Schema, model, Document } from "mongoose";

export interface IAnswer {
  selectedIndex: number;
}

const AnswerSchema = new Schema<IAnswer>({
  selectedIndex: { type: Number, required: true },
});

export interface IQuizResult extends Document {
  student: Schema.Types.ObjectId;
  quiz: Schema.Types.ObjectId;
  answers: IAnswer[];
  score?: number;
  submittedAt: Date;
}

const QuizResultSchema = new Schema<IQuizResult>({
  student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
  answers: [AnswerSchema],
  score: { type: Number },
  submittedAt: { type: Date, default: Date.now },
});

export const QuizResult = model<IQuizResult>("QuizResult", QuizResultSchema);
