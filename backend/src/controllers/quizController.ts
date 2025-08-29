import { Request, Response } from "express";
import { Quiz } from "../models/Quiz";
import { QuizResult } from "../models/QuizResult";
import { Student } from "../models/Student";
import { User } from "../models/User";

/**
 * Create a quiz
 */
export const createQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get all quizzes
 */
export const getQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find()
      .populate("course", "title")
      .populate("createdBy", "name email");
    res.json(quizzes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get single quiz
 */
export const getQuizById = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate("course", "title")
      .populate("createdBy", "name email");
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update quiz
 */
export const updateQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete quiz
 */
export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json({ message: "Quiz deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Student submits a quiz
 */
export const submitQuiz = async (req: Request, res: Response) => {
  try {
    const { studentId, quizId, answers } = req.body;

    // Fetch the quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Calculate score
    let score = 0;
    answers.forEach((ans: any, idx: number) => {
      if (quiz.questions[idx].correctIndex === ans.selectedIndex) {
        score += quiz.questions[idx].mark || 1;
      }
    });

    // Save quiz result
    const result = new QuizResult({
      student: studentId,
      quiz: quizId,
      answers,
      score,
    });
    await result.save();

    res
      .status(201)
      .json({ message: "Quiz submitted", score, resultId: result._id });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get all quizzes for a student based on their enrolled courses
 * @param studentId - The ID of the student
 * @returns Array of quizzes for the student's courses
 */
export const getStudentQuizzes = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // First check if the user exists and is a student
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "Student") {
      return res.status(400).json({ message: "User is not a student" });
    }

    // Find the student using the Student model to get courses
    const student = await Student.findById(id).populate({
      path: "courses",
      select: "_id title",
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Extract course IDs from the student's enrolled courses
    const courseIds = student.courses.map((course: any) => course._id);

    if (courseIds.length === 0) {
      return res.json([]); // No courses, no quizzes
    }

    // Find all quizzes for the student's courses
    const quizzes = await Quiz.find({
      course: { $in: courseIds },
    })
      .populate({
        path: "course",
        select: "_id title",
      })
      .populate({
        path: "createdBy",
        select: "name email",
      })
      .select("-questions.correctIndex") // Exclude correct answers for security
      .sort({ createdAt: -1 }); // Newest first

    res.json(quizzes);
  } catch (error: any) {
    console.error("Error fetching student quizzes:", error);
    res.status(500).json({ message: error.message });
  }
};
