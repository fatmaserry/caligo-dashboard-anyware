import { Course, User } from "../../types";

export interface AnnouncementsResponse {
  success: boolean;
  count: number;
  announcements: Announcement[];
}

// Response interfaces
export interface Announcement {
  _id: string;
  title: string;
  body: string;
  audience: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  course?: Course;
  observers?: string[];
  semester?: string;
  year?: number;
  department?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
