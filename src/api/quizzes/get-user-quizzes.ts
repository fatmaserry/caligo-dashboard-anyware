import { QuizResponse } from "./types";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5001/api";

/**
 * Fetch quizzes for the authenticated user based on their enrolled courses
 */
export const getUserQuizzes = async (
  studentId: string
): Promise<QuizResponse[]> => {
  try {
    // TODO: Add authentication token
    // const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/quiz/student/${studentId}`, {
      method: "GET",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: QuizResponse[] = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching user quizzes:", error);
    throw error;
  }
};
