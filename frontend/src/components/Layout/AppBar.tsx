import React from "react";
import { useTranslation } from "react-i18next";
import { Menu as MenuIcon } from "@mui/icons-material";
import TranslateIcon from "@mui/icons-material/Translate";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../hooks/useLanguage";
import SearchBar from "../UI/SearchBar";
import Avatar from "../UI/Avatar";

interface AppBarProps {
  handleDrawerToggle: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ handleDrawerToggle }) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <header className="text-white fixed w-full h-14 z-30 sm:w-[calc(100%-15rem)]">
      <div className="flex md:items-center bg-[#6EC6CA]/40 sm:bg-transparent flex-col items-start gap-7 md:flex-row p-7">
        <div className="flex items-center justify-between  w-full gap-3 sm:hidden">
          <button
            title="menu"
            type="button"
            className="text-xl text-gray-600"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </button>

          <button
            title="language"
            type="button"
            onClick={() =>
              changeLanguage(currentLanguage === "en" ? "ar" : "en")
            }
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200 text-white"
          >
            <TranslateIcon fontSize="medium" color="primary" />
            <span className="text-sm font-medium text-blue-400">
              {currentLanguage === "en" ? "AR" : "EN"}
            </span>
          </button>
        </div>
        <div className="w-full items-center justify-between hidden sm:flex">
          <h1 className="text-3xl font-bold flex-grow text-gray-600">
            {t("welcome")} {user?.name.split(" ")[0]},
          </h1>

          <div className="gap-4 items-center justify-center hidden lg:flex">
            <SearchBar
              onSearch={(query) => console.log("Searching for:", query)}
              variant="outlined"
              size="medium"
              className="w-96"
            />

            <button
              onClick={() =>
                changeLanguage(currentLanguage === "en" ? "ar" : "en")
              }
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200 text-white"
              title="language"
              type="button"
            >
              <TranslateIcon fontSize="medium" color="primary" />
              <span className="font-medium text-blue-400">
                {currentLanguage === "en" ? "العربية" : "English"}
              </span>
            </button>

            <Avatar src="/student.png" alt="profile" size={50} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppBar;
