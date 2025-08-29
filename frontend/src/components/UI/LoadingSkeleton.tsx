const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="h-8 bg-gray-200 rounded-lg mb-6 w-3/4"></div>
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-100"
        >
          {/* Title */}
          <div className="h-6 bg-gray-200 rounded mb-3 w-4/5"></div>

          {/* Subtitle/Metadata */}
          <div className="flex items-center gap-3 mb-3">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>

          {/* Description */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>

          {/* Additional Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="h-3 bg-gray-200 rounded w-24"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>

          {/* Button/Action */}
          <div className="h-10 bg-gray-200 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
