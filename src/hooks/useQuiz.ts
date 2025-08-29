import { useState, useEffect } from "react";
import { quizzesApi, QuizResponse, ApiError } from "../api/quizzes";

export const useQuiz = (studentId: string | null) => {
  const [data, setData] = useState<QuizResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!studentId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const quizzesData = await quizzesApi.getUserQuizzes(studentId || "");
        setData(quizzesData);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [studentId]);

  return {
    data,
    loading,
    error,
    refetch: () => {
      if (studentId) {
        setLoading(true);
        quizzesApi
          .getUserQuizzes(studentId)
          .then(setData)
          .catch(setError)
          .finally(() => setLoading(false));
      }
    },
  };
};
