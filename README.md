# Anyware Challenge - Education Platform

A comprehensive full-stack education management platform built with modern web technologies, featuring user authentication, course management, quiz systems, and real-time announcements.

## 🚀 Features

### Core Functionality

- **User Authentication & Authorization** - Secure JWT-based authentication system
- **Multi-Role Support** - Students, Instructors, and Organizers with role-based access control
- **Course Management** - Comprehensive course creation and management system
- **Quiz System** - Interactive quiz creation, taking, and result tracking
- **Announcements** - Real-time announcement system for course updates
- **Internationalization** - Multi-language support (English & Arabic)
- **Responsive Design** - Modern, mobile-first UI built with Material-UI and Tailwind CSS

### Technical Features

- **TypeScript** - Full-stack TypeScript implementation for type safety
- **RESTful API** - Well-structured backend API with Express.js
- **MongoDB Integration** - Robust data persistence with Mongoose ODM
- **Real-time Updates** - Live data synchronization across the platform
- **Modular Architecture** - Clean separation of concerns and reusable components

## 🏗️ Architecture

```
anyware-challenge/
├── backend/                 # Node.js + Express + TypeScript API
│   ├── src/
│   │   ├── controllers/    # Business logic layer
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API endpoint definitions
│   │   ├── middlewares/    # Authentication & validation
│   │   └── seed/          # Database seeding utilities
│   └── server.ts          # Main server entry point
├── frontend/               # React + TypeScript SPA
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Main application views
│   │   ├── contexts/      # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── api/           # API integration layer
│   │   └── locales/       # Internationalization files
│   └── public/            # Static assets
└── README.md              # This file
```

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Language**: TypeScript 5.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **CORS**: Cross-origin resource sharing enabled
- **Environment**: dotenv for configuration management

### Frontend

- **Framework**: React 19.x with TypeScript
- **UI Library**: Material-UI (MUI) 7.x
- **Styling**: Tailwind CSS 3.x
- **State Management**: React Context API
- **Internationalization**: i18next with react-i18next
- **Build Tool**: Create React App
- **Testing**: Jest + React Testing Library

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or cloud instance)
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

The backend will be available at `http://localhost:5001`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

### 4. Database Setup

The application automatically seeds the database with sample data on first run. Ensure MongoDB is running and accessible.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/education-platform
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### MongoDB Connection

The application connects to MongoDB using the `MONGO_URI` environment variable. For local development, ensure MongoDB is running on the default port (27017).

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/student/login` - Student authentication
- `POST /api/instructor/login` - Instructor authentication

### Quiz Management

- `GET /api/quiz` - Retrieve user quizzes
- `POST /api/quiz` - Create new quiz
- `PUT /api/quiz/:id` - Update quiz
- `DELETE /api/quiz/:id` - Delete quiz

### Announcements

- `GET /api/announcement` - Get all announcements
- `POST /api/announcement` - Create announcement
- `GET /api/announcement/user/:userId` - Get user-specific announcements

### User Management

- `GET /api/student/:id` - Get student details
- `GET /api/instructor/:id` - Get instructor details

## 🔒 Security Features
- **CORS Protection** - Cross-origin request security
- **Input Validation** - Server-side validation for all inputs
- **Role-Based Access Control** - Granular permission system
- **Environment Variable Protection** - Sensitive data isolation

## 🌐 Internationalization

The application supports multiple languages:
- **English** (en) - Default language
- **Arabic** (ar) - Right-to-left (RTL) support

Language switching is available through the UI and persists across sessions.

## 📱 Responsive Design
- **Mobile-First Approach** - Optimized for mobile devices
- **Material Design** - Modern, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework for rapid development
- **Cross-Browser Compatibility** - Works on all modern browsers

```
