import { Router } from "express";
import {
  getAllInstructors,
  getInstructorById,
  createInstructor,
} from "../controllers/instructorController";

const router = Router();

router.get("/", getAllInstructors); // GET /api/instructors
router.get("/:id", getInstructorById); // GET /api/instructors/:id
router.post("/", createInstructor); // POST /api/instructors

export default router;
