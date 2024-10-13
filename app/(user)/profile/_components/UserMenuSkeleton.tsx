import React from "react";

const UserMenuSkeleton: React.FC = () => {
  return (
    <div className="w-64 absolute bg-white hidden lg:flex flex-col gap-3 p-5 border border-gray-200 rounded-md">
      <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div className="flex flex-col items-center gap-3 w-full border-b border-gray-200 pb-5">
        <div className="relative w-[150px] h-[150px] rounded-full bg-gray-200 animate-pulse">
          <div className="w-7 h-7 absolute bottom-2 right-1 bg-gray-300 rounded-full"></div>
        </div>
        <div className="flex flex-col items-center gap-1 w-full">
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-8 bg-gray-200 rounded animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default UserMenuSkeleton;
