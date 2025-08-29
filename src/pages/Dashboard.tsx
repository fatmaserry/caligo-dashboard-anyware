import React from "react";
import Announcements from "../components/Dashboard/Announcements";
import DueItems from "../components/Dashboard/DueItems";
import { useTranslation } from "react-i18next";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { currentLanguage } = useLanguage();

  if (!user) {
    return (
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{t("announcements")}</h3>
        </div>
        <div className="animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 rounded-lg p-4 mb-4 h-24"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <div className="bg-primary text-white rounded-lg flex flex-col lg:flex-row shadow-md relative overflow-hidden h-fit">
          <div className="flex flex-col p-5 lg:w-1/2 z-10 bg-white">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#184A6C] to-[#6EC6CA] bg-clip-text text-transparent">
              {t("examsTime")}
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t("examsDescription")}
            </p>
            <div
              className={`${
                currentLanguage === "en" ? "border-l-4 pl-4" : "border-r-4 pr-4"
              } border-[#6EC6CA] mb-6`}
            >
              <p className="text-gray-400 italic">
                "Nothing happens until something moves" - Albert Einstein
              </p>
            </div>
            <button
              type="button"
              className="bg-gradient-to-r cursor-pointer from-[#184A6C] to-[#6EC6CA] hover:from-[#1E5A82] hover:to-[#7CD6DA] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {t("viewTips")}
            </button>
          </div>
          <div className="lg:absolute lg:right-0 lg:top-0 h-full">
            <img
              src="/exam-time.jpg"
              alt="exam-time"
              className="h-full w-full object-conatain"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-7 items-center lg:items-start w-full">
        <Announcements userId={user?._id} />
        <DueItems userId={user?._id} />
      </div>
    </Layout>
  );
};

export default Dashboard;
