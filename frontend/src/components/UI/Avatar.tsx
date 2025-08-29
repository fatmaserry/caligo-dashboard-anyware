import React from "react";

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
  border?: boolean;
  borderColor?: string;
  borderWidth?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User avatar",
  size = 40,
  className = "",
  onClick,
  border = true,
  borderColor = "white",
  borderWidth = 2,
}) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = "none";
  };

  return (
    <div
      className={`
        inline-block
        rounded-full
        overflow-hidden
        ${border ? "ring-2" : ""}
        ${onClick ? "cursor-pointer hover:scale-105 transition-transform" : ""}
        ${className}
      `}
      style={{
        width: size,
        height: size,
        borderColor: borderColor,
        borderWidth: borderWidth,
      }}
      onClick={onClick}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleError}
        />
      ) : (
        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500 text-xs">?</span>
        </div>
      )}
    </div>
  );
};

export default Avatar;
