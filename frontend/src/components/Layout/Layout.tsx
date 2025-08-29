import React, { useState } from "react";
import Sidebar from "./Sidebar";
import AppBar from "./AppBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <div className="flex-grow text-black min-h-screen">
        <AppBar handleDrawerToggle={handleDrawerToggle} />
        <main className="p-6 mt-20 bg-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
