import React from "react";
import { useTranslation } from "react-i18next";

interface ListItemProps {
  text: string;
  icon: React.ReactElement;
  onClick?: () => void;
  isActive?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
  text,
  icon,
  onClick,
  isActive,
}) => {
  const { t } = useTranslation();

  return (
    <li className="list-none cursor-pointer">
      <button
        type="button"
        onClick={onClick}
        className={`w-full flex gap-3 items-center p-4 text-left transition-colors duration-200
    ${
      isActive
        ? "bg-white text-primary-50 font-extrabold"
        : "text-white hover:bg-white hover:text-primary-800"
    }`}
      >
        <span>
          {React.cloneElement(icon as React.ReactElement<any>, {
            className: "w-4 h-4",
          })}
        </span>
        {t(text.toLowerCase())}
      </button>
    </li>
  );
};
export default ListItem;
