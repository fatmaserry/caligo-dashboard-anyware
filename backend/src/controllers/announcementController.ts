import { Request, Response } from "express";
import { Announcement } from "../models/Announcement";
import { Student } from "../models/Student";

/**
 * Create a new announcement
 */
export const createAnnouncement = async (req: Request, res: Response) => {
  try {
    const announcement = new Announcement({
      ...req.body,
      createdBy: req.body.createdBy,
    });

    await announcement.save();
    res.status(201).json(announcement);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get all announcements
 */
export const getAnnouncements = async (req: Request, res: Response) => {
  try {
    const filter: any = {};

    // optional filters
    if (req.query.audience) filter.audience = req.query.audience;
    if (req.query.course) filter.course = req.query.course;
    if (req.query.year) filter.year = req.query.year;
    if (req.query.department) filter.department = req.query.department;
    if (req.query.semester) filter.semester = req.query.semester;

    const announcements = await Announcement.find(filter)
      .populate("createdBy", "name email")
      .populate("course", "title")
      .populate("observers", "name email");

    res.json(announcements);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a single announcement by ID
 */
export const getAnnouncementById = async (req: Request, res: Response) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("course", "title");

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.json(announcement);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update an announcement by ID
 */
export const updateAnnouncement = async (req: Request, res: Response) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.json(announcement);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete an announcement by ID
 */
export const deleteAnnouncement = async (req: Request, res: Response) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.json({ message: "Announcement deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get unique announcements for a specific student
 */
export const getStudentAnnouncements = async (req: Request, res: Response) => {
  try {
    // Get the student with their enrolled courses
    const student = await Student.findById(req.params.id).populate("courses");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Extract student information for filtering
    const studentYear = student.year;
    const studentDepartment = student.department;
    const studentCourses = student.courses;

    // query for announcements relevant to the student
    const announcementQuery = {
      $or: [
        // Announcements for all users
        { audience: "all" },

        // Announcements for all students
        { audience: "students" },

        // Announcements for specific year
        {
          audience: "year",
          year: studentYear,
        },

        // Announcements for specific department
        {
          audience: "department",
          department: studentDepartment,
        },

        // Announcements for courses the student is enrolled in
        {
          audience: "course",
          course: { $in: studentCourses },
        },

        // Custom announcements where student is specifically listed
        {
          audience: "custom",
          observers: req.params.id,
        },
      ],
    };

    // Get announcements with population for createdBy and course details
    const announcements = await Announcement.find(announcementQuery)
      .populate("createdBy", "name title")
      .populate("course", "title")
      .sort({ pinned: -1, createdAt: -1 }) // Pinned first
      .exec();

    // Remove duplicates
    const uniqueAnnouncements = announcements.filter(
      (announcement: any, index, self) =>
        index ===
        self.findIndex(
          (a: any) => a._id.toString() === announcement._id.toString()
        )
    );

    res.json({
      success: true,
      count: uniqueAnnouncements.length,
      announcements: uniqueAnnouncements,
    });
  } catch (error) {
    console.error("Error fetching student announcements:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
