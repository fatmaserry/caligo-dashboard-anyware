import React, { createContext, useState, ReactNode } from "react";
import { AuthContextType, User } from "../../types/index";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    setIsAuthenticated(true);
    // Mock fixed user data from server
    setUser({
      _id: "68b194639d7c2877a7031344",
      name: "Fatma Ashraf",
      email: "fashraf@school.edu",
      title: "Freshman",
      dob: "2005-03-09T22:00:00.000Z",
      department: "Mathematics",
      enrolledDate: "2023-08-31T21:00:00.000Z",
      role: "Student",
      createdAt: "2025-08-29T11:52:03.627Z",
      updatedAt: "2025-08-29T11:52:03.627Z",
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
