import { Router } from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
} from "../controllers/studentController";

const router = Router();

router.get("/", getAllStudents); // GET /api/students
router.get("/:id", getStudentById); // GET /api/students/:id
router.post("/", createStudent); // POST /api/students

export default router;
