# Anyware Challenge - Frontend

This is the frontend application for the Anyware Challenge education platform, built with React 19, TypeScript, and Material-UI.

## 🚀 Features

- **Modern React 19** - Latest React features with hooks and context
- **TypeScript** - Full type safety and better development experience
- **Material-UI (MUI)** - Professional UI components and design system
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Internationalization** - Multi-language support (English & Arabic)
- **Responsive Design** - Mobile-first approach with modern UI/UX
- **Authentication** - Secure JWT-based authentication system
- **Real-time Updates** - Live data synchronization with backend

## 🛠️ Tech Stack

- **React** 19.1.1
- **TypeScript** 4.9.5
- **Material-UI** 7.3.1
- **Tailwind CSS** 3.4.17
- **i18next** 25.4.2
- **React Testing Library** 16.3.0
- **Create React App** 5.0.1

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The application runs on `http://localhost:3000` in development mode.

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/          # Authentication components
│   ├── Dashboard/     # Dashboard-specific components
│   ├── Layout/        # Layout and navigation components
│   └── UI/            # Generic UI components
├── contexts/           # React context providers
│   ├── auth/          # Authentication context
│   └── language/      # Internationalization context
├── hooks/              # Custom React hooks
├── pages/              # Main application views
├── api/                # API integration layer
├── types/              # TypeScript type definitions
└── locales/            # Translation files
```

### Key Components

- **Dashboard** - Main application interface
- **Announcements** - Course announcement display
- **DueItems** - Upcoming deadlines and tasks
- **Sidebar** - Navigation and user menu
- **AppBar** - Top navigation bar

## 🌐 Internationalization

The app supports multiple languages:

- **English** (en) - Default language
- **Arabic** (ar) - Right-to-left (RTL) support

Language switching is available through the UI and persists across sessions.

## 🚀 Building for Production
```bash
npm run build
```
This creates an optimized production build in the `build/` folder.

## 📱 Responsive Design

- **Mobile-First** - Optimized for mobile devices
- **Material Design** - Modern, accessible UI components
- **Tailwind CSS** - Rapid development with utility classes
- **Cross-Browser** - Works on all modern browsers

---

For more information, see the main project README in the root directory.
