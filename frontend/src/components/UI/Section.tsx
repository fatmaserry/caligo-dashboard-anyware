import React from "react";
import { useTranslation } from "react-i18next";
import LoadingSkeleton from "./LoadingSkeleton";
import { ApiError } from "../../api/announcements";
import RefreshIcon from "@mui/icons-material/Refresh";

interface SectionProps {
  children: React.ReactNode;
  onRefetch?: () => void;
  onClickAll?: () => void;
  loading?: boolean;
  error?: ApiError | null;
  title: string;
  description?: string;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  onRefetch,
  onClickAll,
  loading,
  error,
  title,
  description,
  className = "",
}) => {
  const { t } = useTranslation();

  return (
    <div className={`flex-1 bg-gray-100 shadow-md p-2 rounded-lg ${className}`}>
      <div className="flex justify-between items-center mb-4 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-extrabold text-gray-600">
            {title || ""}
          </h3>
          <h3 className="text-sm font-light text-gray-400">
            {description || ""}
          </h3>
        </div>

        {error ? (
          <div className="flex space-x-2">
            {onClickAll && (
              <button
                type="button"
                onClick={onRefetch}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {t("retry")}
              </button>
            )}
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            {onClickAll && (
              <span
                onClick={onClickAll}
                className="text-sm text-primary-100 font-extrabold cursor-pointer"
              >
                {t("all")}
              </span>
            )}
            {onRefetch && (
              <button
                title="refresh"
                type="button"
                onClick={onRefetch}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                <RefreshIcon fontSize="medium" />
              </button>
            )}
          </div>
        )}
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error.message || t("errorLoadingAnnouncements")}
        </div>
      ) : loading ? (
        <LoadingSkeleton />
      ) : (
        children
      )}
    </div>
  );
};

export default Section;
