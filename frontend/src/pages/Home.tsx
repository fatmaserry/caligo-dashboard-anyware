import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-br from-primary-50 to-secondary-800 text-center">
      {/* Login */}
      <form
        action=""
        className="bg-gray-50 rounded-md p-8 min-w-96"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("appName")}</h1>
        <p className="text-lg md:text-xl text-gray-500 mb-8">
          {t("educationalPlatform")}
        </p>

        <button
          title="login"
          type="button"
          onClick={login}
          className="bg-primary-500 w-full text-white font-semibold px-6 py-3 rounded-lg text-lg hover:bg-gray-50 hover:text-primary-400 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
        >
          {t("login")}
        </button>
      </form>
    </div>
  );
};

export default Home;
