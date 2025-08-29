import { useState, useEffect } from 'react';
import { announcementsApi, AnnouncementsResponse, ApiError } from '../api/announcements';

export const useAllAnnouncements = () => {
  const [data, setData] = useState<AnnouncementsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await announcementsApi.getAll();
        setData(result);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useStudentAnnouncements = (studentId: string | null) => {
  const [data, setData] = useState<AnnouncementsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!studentId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const result = await announcementsApi.getStudentAnnouncements(studentId);
        setData(result);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  return { data, loading, error, refetch: () => {
    if (studentId) {
      setLoading(true);
      announcementsApi.getStudentAnnouncements(studentId)
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }};
};