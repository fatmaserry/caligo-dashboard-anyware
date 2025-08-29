import { useContext } from "react";
import { useTranslation } from "react-i18next";
import LanguageContext from "../contexts/language/LanguageContext";

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  const { i18n } = useTranslation();

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  const changeLanguage = async (lang: string) => {
    try {
      await i18n.changeLanguage(lang);
      context.changeLanguage(lang);
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  return {
    currentLanguage: context.currentLanguage,
    changeLanguage,
    t: context.t,
  };
};
