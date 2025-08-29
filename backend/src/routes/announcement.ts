import { Router } from "express";
import * as announcementController from "../controllers/announcementController";
import { authMiddleware, requireRole } from "../middlewares/auth";

const router = Router();

router.get("/", authMiddleware, announcementController.getAnnouncements);
router.get("/:id", authMiddleware, announcementController.getAnnouncementById);
router.get(
  "/student/:id",
  authMiddleware,
  announcementController.getStudentAnnouncements
);

// Only instructors can create, update, delete
router.post(
  "/",
  authMiddleware,
  //   requireRole(["Instructor"]),
  announcementController.createAnnouncement
);

router.put(
  "/:id",
  authMiddleware,
  //   requireRole(["Instructor"]),
  announcementController.updateAnnouncement
);

router.delete(
  "/:id",
  authMiddleware,
  //   requireRole(["Instructor"]),
  announcementController.deleteAnnouncement
);

export default router;
