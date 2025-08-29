import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import { useLanguage } from "../../hooks/useLanguage";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  delay?: number;
  variant?: "outlined" | "filled" | "minimal";
  size?: "small" | "medium" | "large";
  className?: string;
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onSearch,
  delay = 300,
  variant = "outlined",
  size = "medium",
  className = "",
  disabled = false,
}) => {
  const [query, setQuery] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const { currentLanguage } = useLanguage();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Clear previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set new timeout for debounced search
    const newTimeoutId = setTimeout(() => {
      onSearch(value);
    }, delay);

    setTimeoutId(newTimeoutId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    onSearch(query);
  };

  // Size classes
  const sizeClasses = {
    small: "h-8 text-sm",
    medium: "h-10 text-base",
    large: "h-12 text-lg",
  };

  // Variant classes
  const variantClasses = {
    outlined: "border border-gray-300 bg-white focus:border-primary-500",
    filled:
      "bg-gray-100 border border-transparent focus:bg-white focus:border-primary-500",
    minimal: "bg-transparent border-b border-gray-300 focus:border-primary-500",
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div
        className={`relative flex items-center rounded-lg transition-all ${
          sizeClasses[size]
        } ${variantClasses[variant]} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {/* Search Icon */}
        <Search
          className="absolute left-3 text-gray-400"
          fontSize={size === "small" ? "small" : "medium"}
        />

        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={
            placeholder || currentLanguage === "en" ? "Search..." : "بحث..."
          }
          disabled={disabled}
          className={`w-full pl-10 pr-10 bg-transparent outline-none placeholder-gray-400 ${
            disabled ? "cursor-not-allowed" : ""
          }`}
        />
      </div>
    </form>
  );
};

export default SearchBar;
