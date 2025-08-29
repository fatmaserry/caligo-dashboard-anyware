import { AnnouncementsResponse, ApiError } from "./types";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5001/api";

/**
 * Fetch all announcements (for admin/organizer view)
 */
export const getAllAnnouncements = async (): Promise<AnnouncementsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/announcement`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

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
    console.error("Error fetching all announcements:", error);
    throw error;
  }
};

/**
 * Get announcements with optional filtering
 */
export const getFilteredAnnouncements = async (
  filters: {
    audience?: string;
    course?: string;
    pinned?: boolean;
  } = {}
): Promise<AnnouncementsResponse> => {
  try {
    const queryParams = new URLSearchParams();

    if (filters.audience) queryParams.append("audience", filters.audience);
    if (filters.course) queryParams.append("course", filters.course);
    if (filters.pinned !== undefined)
      queryParams.append("pinned", filters.pinned.toString());

    const response = await fetch(
      `${API_BASE_URL}/announcement?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    console.error("Error fetching filtered announcements:", error);
    throw error;
  }
};
