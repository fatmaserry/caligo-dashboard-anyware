import React from "react";
import { useTranslation } from "react-i18next";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import Section from "../UI/Section";
import { useQuiz } from "../../hooks/useQuiz";

interface DueItemsProps {
  userId: string | null;
}

const DueItems: React.FC<DueItemsProps> = ({ userId }) => {
  const { t } = useTranslation();
  const { data, loading, error, refetch } = useQuiz(userId);

  return (
    <Section
      className="lg:max-w-md w-full"
      title={t("whatsDue")}
      onClickAll={() => {
        console.log("All clicked");
      }}
      onRefetch={refetch}
      loading={loading}
      error={error}
    >
      {data.length ? (
        data.map((quiz, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border-2 border-gray-200 mx-5 p-4 mb-4 flex flex-col gap-2"
          >
            <div className="flex items-center mb-1 gap-2">
              <HourglassBottomIcon
                fontSize="large"
                className="text-primary-300 mb-2"
              />
              <h4 className="font-bold text-gray-800 mb-2">{quiz.title}</h4>
            </div>

            <p className="text-sm text-gray-500">
              Course: {quiz.course?.title || "Unknown Course"}
            </p>
            <p className="text-sm text-gray-500">
              Topic: {quiz.topic || "General"}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Due to: {new Date(quiz.deadline).toLocaleDateString()}
            </p>
            <button
              type="button"
              className="w-full cursor-pointer border-primary-50 border-[3px] rounded-lg text-primary-50 font-bold py-2 px-4 hover:bg-primary-500 hover:border-transparent hover:text-white transition-colors"
            >
              Take Quiz
            </button>
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-3 items-center justify-center p-4 text-center">
          <img src="/no-deadlines.png" alt="No Dues" width={200} height={200} />
          <h2 className="text-gray-700 font-medium uppercase">
            {t("noDueItems")} 🎉
          </h2>
        </div>
      )}
    </Section>
  );
};

export default DueItems;
