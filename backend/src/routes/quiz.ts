import { Router } from "express";
import * as quizController from "../controllers/quizController";
import { authMiddleware, requireRole } from "../middlewares/auth";

const router = Router();

// Both students & instructors can view quizzes
router.get("/", authMiddleware, quizController.getQuizzes);
router.get("/:id", authMiddleware, quizController.getQuizById);

// Get quizzes for a specific student
router.get("/student/:id/", quizController.getStudentQuizzes);

// Only instructors can manage quizzes
router.post(
  "/",
  authMiddleware,
  //   requireRole(["Instructor"]),
  quizController.createQuiz
);
router.put(
  "/:id",
  authMiddleware,
  //   requireRole(["Instructor"]),
  quizController.updateQuiz
);
router.delete(
  "/:id",
  authMiddleware,
  //   requireRole(["Instructor"]),
  quizController.deleteQuiz
);

// Students can submit answers
router.post(
  "/submit",
  authMiddleware,
  //   requireRole(["Student"]),
  quizController.submitQuiz
);

export default router;
