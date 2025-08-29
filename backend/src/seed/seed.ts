import mongoose from "mongoose";
import dotenv from "dotenv";
import { Announcement, IAnnouncement } from "../models/Announcement";
import { Course, ICourse } from "../models/Course";
import { Instructor, IInstructor } from "../models/Instructor";
import { Quiz, IQuestion } from "../models/Quiz";
import { Student, IStudent } from "../models/Student";
import { Organizer, IOrganizer } from "../models/Organizer"; 

dotenv.config();
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/education-platform";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Drop the entire database
const dropDatabase = async () => {
  try {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
      console.log("Database dropped successfully");
    } else {
      console.log("No database connection to drop");
    }
  } catch (error) {
    console.error("Error dropping database:", error);
    throw error;
  }
};

// Updated interface for Organizer role
interface SampleUsers {
  instructors: IInstructor[];
  organizers: IOrganizer[]; // Changed to array of organizers
}

// Sample data - removed role field since we'll use titles instead
const sampleAnnouncements = [
  {
    name: "Mr. Ahmed Mostafa",
    title: "Math Instructor",
    course: "Math Q2",
    message:
      "Hi Students! Just want you ready to our exams and focus on remaining assessments in the past three grades, good luck my work!",
  },
  {
    name: "Mrs. Salma Ahmed",
    title: "Physics Instructor",
    course: "Physics Q2",
    message:
      "Hello my students. I want to announce that the next quiz will be within 3 days and will cover the whole unit 2. Good Luck! :)",
  },
  {
    name: "School Management",
    title: "School Administration",
    message:
      "Good morning, Warrens! That get ready-for-the-day call is heard each morning by 690 students at Gotohayn Junior High School, Egypt. I just want you ready to our exams and focus on remaining assessments to gain more grades, good luck my warmest!",
  },
  {
    name: "Events Manager",
    title: "Events Coordinator",
    message:
      "Can't wait our upcoming trip so she next weekend. The trip will be to Dreampark and Pyramid :D to book you must please contact your class teacher.",
  },
];

// Sample quiz questions for different subjects
const mathQuestions: IQuestion[] = [
  {
    text: "What is the value of π (pi) approximately?",
    options: ["3.14", "2.71", "1.62", "4.67"],
    correctIndex: 0,
    mark: 1,
  },
  {
    text: "Solve for x: 2x + 5 = 15",
    options: ["x = 5", "x = 10", "x = 7.5", "x = 5.5"],
    correctIndex: 0,
    mark: 1,
  },
  {
    text: "What is the Pythagorean theorem?",
    options: ["a² + b² = c²", "E = mc²", "F = ma", "V = IR"],
    correctIndex: 0,
    mark: 2,
  },
];

const physicsQuestions: IQuestion[] = [
  {
    text: "What is the SI unit of force?",
    options: ["Newton", "Joule", "Watt", "Pascal"],
    correctIndex: 0,
    mark: 1,
  },
  {
    text: "Which law states that every action has an equal and opposite reaction?",
    options: [
      "Newton's Third Law",
      "Newton's First Law",
      "Newton's Second Law",
      "Ohm's Law",
    ],
    correctIndex: 0,
    mark: 1,
  },
  {
    text: "What is the formula for kinetic energy?",
    options: ["½mv²", "mgh", "Fd", "PV"],
    correctIndex: 0,
    mark: 2,
  },
];

// Function to create sample users
const createSampleUsers = async (): Promise<SampleUsers> => {
  try {
    // Create sample instructors using the discriminator model
    const instructors = await Instructor.create([
      {
        name: "Mr. Ahmed Mostafa",
        email: "ahmed.mostafa@school.edu",
        title: "Math Instructor",
        dob: new Date(1980, 5, 15),
        department: "Mathematics",
        enrolledDate: new Date(2015, 8, 1),
        role: "Instructor",
        courses: [],
      },
      {
        name: "Mrs. Salma Ahmed",
        email: "salma.ahmed@school.edu",
        title: "Physics Instructor",
        dob: new Date(1985, 3, 22),
        department: "Physics",
        enrolledDate: new Date(2018, 1, 15),
        role: "Instructor",
        courses: [],
      },
    ]);

    // Create sample organizers using the Organizer discriminator model
    const organizers = await Organizer.create([
      {
        name: "School Management",
        email: "management@school.edu",
        title: "School Administration",
        dob: new Date(1975, 0, 1),
        department: "Administration",
        enrolledDate: new Date(2010, 0, 1),
        role: "Organizer",
        permissions: ["manage_announcements", "manage_users"],
      },
      {
        name: "Events Manager",
        email: "events@school.edu",
        title: "Events Coordinator",
        dob: new Date(1982, 7, 12),
        department: "Student Affairs",
        enrolledDate: new Date(2019, 3, 10),
        role: "Organizer",
        permissions: ["manage_events"],
      },
    ]);

    console.log("Sample users created successfully");
    return { instructors, organizers };
  } catch (error) {
    console.error("Error creating sample users:", error);
    throw error;
  }
};

// Function to create sample students and assign them to courses
const createSampleStudents = async (
  courses: ICourse[]
): Promise<IStudent[]> => {
  try {
    // Create sample students and assign them to appropriate courses
    const students = await Student.create([
      {
        _id: new mongoose.Types.ObjectId("68b194639d7c2877a7031344"), // Fixed ID for testing
        name: "Fatma Ashraf",
        email: "fashraf@school.edu",
        title: "Freshman",
        dob: new Date(2005, 2, 10),
        department: "Mathematics",
        enrolledDate: new Date(2023, 8, 1),
        role: "Student",
        gpa: 3.5,
        year: 1,
        courses: [courses[0]._id], // Enroll in Math course
      },
      {
        name: "Ahmed Ali",
        email: "ahmedali@school.edu",
        title: "Sophomore",
        dob: new Date(2004, 4, 18),
        department: "Physics",
        enrolledDate: new Date(2022, 8, 1),
        role: "Student",
        gpa: 3.8,
        year: 2,
        courses: [courses[1]._id], // Enroll in Physics course
      },
      {
        name: "Sofia Hassan",
        email: "shassan@school.edu",
        title: "Junior",
        dob: new Date(2003, 7, 5),
        department: "Mathematics",
        enrolledDate: new Date(2021, 8, 1),
        role: "Student",
        gpa: 3.9,
        year: 3,
        courses: [courses[0]._id, courses[1]._id], // Enroll in both courses
      },
    ]);

    console.log("Sample students created successfully");
    return students;
  } catch (error) {
    console.error("Error creating sample students:", error);
    throw error;
  }
};

// Function to create sample courses
const createSampleCourses = async (
  instructors: IInstructor[]
): Promise<ICourse[]> => {
  try {
    const currentDate = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(currentDate.getMonth() + 3);

    const courses = await Course.create([
      {
        title: "Mathematics Q2",
        description: "Advanced Mathematics Course for Quarter 2",
        startDate: currentDate,
        endDate: nextMonth,
        instructor: instructors[0]._id,
        quizzes: [],
      },
      {
        title: "Physics Q2",
        description: "Physics Course for Quarter 2",
        startDate: currentDate,
        endDate: nextMonth,
        instructor: instructors[1]._id,
        quizzes: [],
      },
    ]);

    // Update instructors with their courses
    await Instructor.findByIdAndUpdate(instructors[0]._id, {
      courses: [courses[0]._id],
    });

    await Instructor.findByIdAndUpdate(instructors[1]._id, {
      courses: [courses[1]._id],
    });

    console.log("Sample courses created successfully");
    return courses;
  } catch (error) {
    console.error("Error creating sample courses:", error);
    throw error;
  }
};

// Function to create sample announcements
const createSampleAnnouncements = async (
  users: SampleUsers,
  courses: ICourse[]
) => {
  try {
    const announcements: Partial<IAnnouncement>[] = [];

    // Math instructor announcement
    announcements.push({
      title: "Exam Preparation Reminder",
      body: sampleAnnouncements[0].message,
      audience: "course",
      course: courses[0]._id,
      createdBy: users.instructors[0]._id,
      pinned: true,
    });

    // Physics instructor announcement
    announcements.push({
      title: "Upcoming Quiz Announcement",
      body: sampleAnnouncements[1].message,
      audience: "course",
      course: courses[1]._id,
      createdBy: users.instructors[1]._id,
      pinned: true,
    });

    // School management announcement (created by first organizer)
    announcements.push({
      title: "General Exam Preparation",
      body: sampleAnnouncements[2].message,
      audience: "all",
      createdBy: users.organizers[0]._id,
      pinned: false,
    });

    // Events announcement (created by second organizer)
    announcements.push({
      title: "Upcoming School Trip",
      body: sampleAnnouncements[3].message,
      audience: "students",
      createdBy: users.organizers[1]._id,
      pinned: true,
    });

    await Announcement.insertMany(announcements);
    console.log("Sample announcements created successfully");
  } catch (error) {
    console.error("Error creating sample announcements:", error);
    throw error;
  }
};

// Function to create sample quizzes
const createSampleQuizzes = async (
  courses: ICourse[],
  instructors: IInstructor[]
) => {
  try {
    const currentSemester = "Fall 2023";

    const quizzes = await Quiz.create([
      {
        title: "Mathematics Midterm Quiz",
        topic: "Algebra and Geometry",
        description:
          "Quiz covering fundamental concepts from the first half of the course",
        semester: currentSemester,
        course: courses[0]._id,
        totalMarks: mathQuestions.reduce((sum, q) => sum + (q.mark || 1), 0),
        questions: mathQuestions,
        deadline: new Date(new Date().setDate(new Date().getDate() + 7)), // Deadline one week from now
        createdBy: instructors[0]._id,
      },
      {
        title: "Physics Unit 2 Quiz",
        topic: "Mechanics",
        description: "Quiz covering Unit 2 material as announced",
        semester: currentSemester,
        course: courses[1]._id,
        totalMarks: physicsQuestions.reduce((sum, q) => sum + (q.mark || 1), 0),
        questions: physicsQuestions,
        deadline: new Date(new Date().setDate(new Date().getDate() + 5)), // Deadline five days from now
        createdBy: instructors[1]._id,
      },
    ]);

    // Update courses with quiz references
    await Course.findByIdAndUpdate(courses[0]._id, {
      quizzes: [quizzes[0]._id],
    });

    await Course.findByIdAndUpdate(courses[1]._id, {
      quizzes: [quizzes[1]._id],
    });

    console.log("Sample quizzes created successfully");
    return quizzes;
  } catch (error) {
    console.error("Error creating sample quizzes:", error);
    throw error;
  }
};

export default async function seed() {
  try {
    await connectDB();

    // Drop the database first
    await dropDatabase();

    // Create sample data in the correct order
    const users = await createSampleUsers();
    const courses = await createSampleCourses(users.instructors);
    const students = await createSampleStudents(courses);
    await createSampleAnnouncements(users, courses);
    await createSampleQuizzes(courses, users.instructors);

    console.log("Database seeded successfully!");
    console.log(`Created ${users.instructors.length} instructors`);
    console.log(`Created ${users.organizers.length} organizers`);
    console.log(`Created ${students.length} students`);
    console.log(`Created ${courses.length} courses`);
    console.log("Created 4 announcements");
    console.log("Created 2 quizzes");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}
