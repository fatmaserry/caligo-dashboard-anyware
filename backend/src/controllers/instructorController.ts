import { Request, Response } from "express";
import { Instructor } from "../models/Instructor";

export const getAllInstructors = async (req: Request, res: Response) => {
  try {
    const instructors = await Instructor.find().populate("courses");
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch instructors" });
  }
};

export const getInstructorById = async (req: Request, res: Response) => {
  try {
    const instructor = await Instructor.findById(req.params.id).populate("courses");
    if (!instructor) return res.status(404).json({ error: "Instructor not found" });
    res.json(instructor);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch instructor" });
  }
};

export const createInstructor = async (req: Request, res: Response) => {
  try {
    const instructor = new Instructor(req.body);
    await instructor.save();
    res.status(201).json(instructor);
  } catch (err) {
    res.status(400).json({ error: "Failed to create instructor" });
  }
};
