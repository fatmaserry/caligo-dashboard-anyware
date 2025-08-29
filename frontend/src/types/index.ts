export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
}

export interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  t: (key: string) => string;
}

export interface BaseEntity {
  _id: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// User types
export interface User extends BaseEntity {
  name: string;
  image_url?: string;
  email: string;
  title: string;
  dob: Date | string;
  department: string;
  enrolledDate: Date | string;
  role: 'Student' | 'Instructor' | 'Orgnizer';
}

export interface Student extends User {
  gpa: number;
  year: number;
  courses: string[]; // Course IDs
}

export interface Instructor extends User {
  courses: string[]; // Course IDs
}

// Course types
export interface Course extends BaseEntity {
  title: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  instructor: string; // Instructor ID
  quizzes: string[]; // Quiz IDs
}

// Quiz types
export interface Question {
  text: string;
  options: string[];
  correctIndex: number;
  mark?: number;
}

export interface Quiz extends BaseEntity {
  title: string;
  topic?: string;
  description?: string;
  semester: string;
  course: string; // Course ID
  totalMarks: number;
  questions: Question[];
  createdBy: string; // Instructor ID
}

// Quiz result types
export interface Answer {
  selectedIndex: number;
}

export interface QuizResult extends BaseEntity {
  student: string; // Student ID
  quiz: string; // Quiz ID
  answers: Answer[];
  score?: number;
  submittedAt: Date | string;
}

// Announcement types
export type AudienceType = 
  | "all"
  | "students"
  | "instructors"
  | "course"
  | "year"
  | "department"
  | "custom";

export interface Announcement extends BaseEntity {
  title: string;
  body: string;
  audience: AudienceType;
  semester?: string;
  course?: string; // Course ID
  year?: number;
  department?: string;
  observers?: string[]; // User IDs
  pinned?: boolean;
  createdBy: string; // User ID
}