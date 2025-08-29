import { getAllAnnouncements, getFilteredAnnouncements } from './get-all';
import { getInstructorAnnouncements, getOrganizerAnnouncements, getStudentAnnouncements } from './get-user-announcements';
export * from './types';

export const announcementsApi = {
  getAll: getAllAnnouncements,
  getFiltered: getFilteredAnnouncements,
  
  getStudentAnnouncements,
  getInstructorAnnouncements,
  getOrganizerAnnouncements,
};