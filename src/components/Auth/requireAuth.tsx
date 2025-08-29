import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Home from "../../pages/Home";

const requireAuth = (Component: React.FC) => {
  return () => {
    const { isAuthenticated } = useAuth();

    console.log(isAuthenticated)
    if (!isAuthenticated) {
      return <Home />;
    }

    return <Component />;
  };
};

export default requireAuth;
