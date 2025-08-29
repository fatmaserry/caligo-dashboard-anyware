import { useContext } from "react";
import AuthContext from "../contexts/auth/AuthContext";
import { AuthContextType } from "../types/index";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
