import React from "react";
import { useTranslation } from "react-i18next";
import { Close as CloseIcon } from "@mui/icons-material";
import { useStudentAnnouncements } from "../../hooks/useAnnouncement";
import { formatDistanceToNow } from "date-fns";
import Section from "../UI/Section";

interface AnnouncementsProps {
  userId: string | null;
  showFilter?: boolean;
}

// TODO : Add filtering functionality based on props.showFilter
const Announcements: React.FC<AnnouncementsProps> = ({
  userId,
  showFilter = false,
}) => {
  const { t } = useTranslation();
  const { data, loading, error, refetch } = useStudentAnnouncements(userId);

  return (
    <Section
      title={t("announcements")}
      description={"We educate warriors! Keep updated :)"}
      onClickAll={() => {
        console.log("All clicked");
      }}
      onRefetch={refetch}
      loading={loading}
      error={error}
    >
      {data ? (
        !data.announcements.length ? (
          <div className="flex flex-col gap-3 items-center justify-center p-4 text-center">
            <img
              src="/no-announcement.png"
              alt="No Announcement"
              width={200}
              height={200}
            />
            <h2 className="text-gray-700 font-medium uppercase">
              {t("noAnnouncement")}
            </h2>
          </div>
        ) : (
          data.announcements.map((announcement) => (
            <div
              key={announcement._id}
              className={`bg-white rounded-lg p-4 mb-4 border-l-4 mx-5 ${
                announcement.pinned ? "border-primary-100" : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-3">
                  {announcement.pinned && (
                    <span className="" role="img" aria-label="Pinned">
                      📌
                    </span>
                  )}
                  <div className="flex gap-2">
                    <img
                      src="/user-default.jpg"
                      alt="user"
                      className="hidden lg:block"
                      width={50}
                      height={50}
                    />
                    <div>
                      <h4 className="font-bold text-gray-600 text-lg">
                        {announcement.title}
                      </h4>
                      <div className="flex flex-col p-2 lg:p-0 lg:flex-row lg:items-center gap-2 text-sm text-gray-500">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold">
                            {announcement.createdBy.name}
                          </span>

                          <div className="flex items-center gap-2">
                            <span>•</span>
                            <span>{announcement.createdBy.title}</span>
                          </div>
                        </div>

                        {announcement.course && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span>•</span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              {announcement.course.title}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  title="close"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <CloseIcon fontSize="small" />
                </button>
              </div>

              <p className="mt-3 text-gray-500 text-base leading-relaxed">
                {announcement.body}
              </p>

              <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                <span className="capitalize">{announcement.audience}</span>
                <span>
                  {formatDistanceToNow(new Date(announcement.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          ))
        )
      ) : null}
    </Section>
  );
};

export default Announcements;
