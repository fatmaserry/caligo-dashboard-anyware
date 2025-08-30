# Anyware Challenge - Backend

This is the backend API server for the Anyware Challenge education platform, built with Node.js, Express.js, TypeScript, and MongoDB.

## 🚀 Features

- **RESTful API** - Well-structured REST endpoints
- **JWT Authentication** - Secure token-based authentication
- **MongoDB Integration** - Robust data persistence with Mongoose ODM
- **TypeScript** - Full type safety and better development experience
- **Role-Based Access Control** - Multi-role user system (Students, Instructors, Organizers)
- **Automatic Database Seeding** - Sample data generation for development
- **CORS Enabled** - Cross-origin resource sharing support
- **Environment Configuration** - Flexible configuration management

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Language**: TypeScript 5.9.2
- **Database**: MongoDB with Mongoose 8.18.0
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **CORS**: cors 2.8.5
- **Environment**: dotenv 17.2.1
- **Development**: nodemon, ts-node-dev

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

The server runs on `http://localhost:5001` by default.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/education-platform
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

### MongoDB Connection

The application connects to MongoDB using the `MONGO_URI` environment variable. For local development, ensure MongoDB is running on the default port (27017).

## 🏗️ Project Structure

```
src/
├── controllers/         # Business logic layer
│   ├── announcementController.ts
│   ├── instructorController.ts
│   ├── quizController.ts
│   └── studentController.ts
├── models/              # MongoDB schemas
│   ├── Announcement.ts
│   ├── Course.ts
│   ├── Instructor.ts
│   ├── Organizer.ts
│   ├── Quiz.ts
│   ├── QuizResult.ts
│   ├── Student.ts
│   └── User.ts
├── routes/              # API endpoint definitions
│   ├── announcement.ts
│   ├── instructor.ts
│   ├── quiz.ts
│   └── student.ts
├── middlewares/         # Authentication & validation
│   └── auth.ts
└── seed/                # Database seeding utilities
    └── seed.ts
```

## 📚 API Endpoints

### Quiz Management
- `GET /api/quiz` - Retrieve all quizzes
- `POST /api/quiz` - Create new quiz
- `PUT /api/quiz/:id` - Update quiz
- `DELETE /api/quiz/:id` - Delete quiz
- `GET /api/quiz/student/:id` - Retrieve student quizzes

### Announcements
- `GET /api/announcement` - Get all announcements
- `POST /api/announcement` - Create announcement
- `PUT /api/announcement/:id` - Update announcement
- `DELETE /api/announcement/:id` - Delete announcement
- `GET /api/announcement/student/:id` - Get student-specific announcements

### User Management
- `GET /api/student/:id` - Get student details
- `GET /api/instructor/:id` - Get instructor details


## 🗄️ Database Models

### Core Models

- **User** - Base user model with authentication
- **Student** - Student-specific information and courses
- **Instructor** - Instructor details and course assignments
- **Organizer** - Platform administration and management

### Content Models

- **Course** - Course information and structure
- **Quiz** - Quiz content and questions
- **QuizResult** - Student quiz performance tracking
- **Announcement** - Course and platform announcements

## 🔒 Security Features

- **CORS Protection** - Cross-origin request security
- **Input Validation** - Server-side validation for all inputs
- **Role-Based Access Control** - Granular permission system
- **Environment Variable Protection** - Sensitive data isolation

---

For more information, see the main project README in the root directory.
