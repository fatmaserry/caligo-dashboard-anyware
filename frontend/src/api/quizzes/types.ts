export interface QuizResponse {
  _id: string;
  title: string;
  topic?: string;
  description?: string;
  semester: string;
  course: {
    _id: string;
    title: string;
  };
  totalMarks: number;
  questions: Array<{
    text: string;
    options: string[];
    mark: number;
    _id: string;
  }>;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  deadline: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
