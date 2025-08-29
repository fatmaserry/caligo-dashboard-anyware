import React, { useState } from "react";
import {
  Schedule as ScheduleIcon,
  Book as BookIcon,
  Grade as GradeIcon,
  TrendingUp as TrendingUpIcon,
  Announcement as AnnouncementIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import ListItem from "../UI/ListItem";
import { useAuth } from "../../hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchBar from "../UI/SearchBar";
import Avatar from "../UI/Avatar";

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen,
  handleDrawerToggle,
}) => {
  const { logout, user } = useAuth();
  const [activeItem, setActiveItem] = useState("dashboard"); // default active

  const menuItems = [
    { text: "dashboard", icon: <HomeIcon /> },
    { text: "scheduled", icon: <ScheduleIcon /> },
    { text: "courses", icon: <BookIcon /> },
    { text: "gradebook", icon: <GradeIcon /> },
    { text: "performance", icon: <TrendingUpIcon /> },
    { text: "announcement", icon: <AnnouncementIcon /> },
  ];

  return (
    <nav className="sm:w-60 flex-shrink-0">
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity sm:hidden ${
          mobileOpen ? "block" : "hidden"
        }`}
        onClick={handleDrawerToggle}
      ></div>

      <div
        className={`fixed top-0 left-0 z-50 h-full w-60 shadow-lg transform transition-transform sm:relative sm:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gradient-to-b from-[#184A6C] to-[#6EC6CA] flex flex-col`}
      >
        {/* Header */}
        <div className="bg-primary text-white p-4 flex items-center justify-center">
          <h1
            className="text-3xl font-semibold text-center"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Coligo
          </h1>
          <button
            type="button"
            className="sm:hidden text-white absolute right-4 top-4"
            onClick={handleDrawerToggle}
            title="Close sidebar"
          >
            &times;
          </button>
        </div>

        <div className="flex gap-4 w-full items-center justify-center lg:hidden">
          <SearchBar
            onSearch={(query) => console.log("Searching for:", query)}
            variant="outlined"
            size="small"
            className="w-full rounded-sm mx-3"
          />
        </div>

        {/* Menu items */}
        <ul className="mt-4 flex flex-col flex-grow list-none">
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              text={item.text}
              icon={item.icon}
              onClick={() => setActiveItem(item.text)}
              isActive={activeItem === item.text}
            />
          ))}
        </ul>

        {/* Logout */}
        <div className="p-4 flex flex-col gap-3 lg:hidden">
          {user && (
            <>
              <div className="flex gap-3 items-center">
                <Avatar src="/student.png" alt="profile" size={50} />
                <div className="flex flex-col">
                  <p className="font-semibold text-sm text-gray-800">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-600">{user.department}</p>
                </div>
              </div>
              <ListItem
                text="logout"
                icon={<LogoutIcon />}
                onClick={logout}
                isActive={false}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
