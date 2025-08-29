import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContextType } from "../../types/index";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "en");

  useEffect(() => {
    // Sync with i18n language changes
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);

    // Set initial direction
    if (currentLanguage === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    }

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n, currentLanguage]);

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);

    // Set document direction based on language
    if (lang === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    }
  };

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, changeLanguage, t: i18n.t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
