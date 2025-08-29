import { AnnouncementsResponse, ApiError } from "./types";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5001/api";

/**
 * Fetch announcements for a specific student
 */
export const getStudentAnnouncements = async (
  studentId: string
): Promise<AnnouncementsResponse> => {
  try {
    if (!studentId) {
      const error = new Error("Student ID is required") as ApiError;
      throw error;
    }

    const response = await fetch(
      `${API_BASE_URL}/announcement/student/${studentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      ) as ApiError;
      error.status = response.status;
      throw error;
    }

    const data: AnnouncementsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching student announcements:", error);
    throw error;
  }
};

/**
 * Fetch announcements for a specific instructor
 */
export const getInstructorAnnouncements = async (
  instructorId: string
): Promise<AnnouncementsResponse> => {
  try {
    if (!instructorId) {
      const error = new Error("Instructor ID is required") as ApiError;
      throw error;
    }

    const response = await fetch(
      `${API_BASE_URL}/announcement/instructor/${instructorId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      ) as ApiError;
      error.status = response.status;
      throw error;
    }

    const data: AnnouncementsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching instructor announcements:", error);
    throw error;
  }
};

/**
 * Fetch announcements for a specific organizer
 */
export const getOrganizerAnnouncements = async (
  organizerId: string
): Promise<AnnouncementsResponse> => {
  try {
    if (!organizerId) {
      const error = new Error("Organizer ID is required") as ApiError;
      throw error;
    }

    const response = await fetch(
      `${API_BASE_URL}/announcement/organizer/${organizerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      ) as ApiError;
      error.status = response.status;
      throw error;
    }

    const data: AnnouncementsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching organizer announcements:", error);
    throw error;
  }
};
