import React from "react";

const ProfileFormSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4].map((item) => (
      <div key={item} className="space-y-2">
        <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
      </div>
    ))}
    <div className="flex justify-between pt-4">
      <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

const ProfilePageSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 container mx-auto p-4">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
      <ProfileFormSkeleton />
      <ProfileFormSkeleton />
    </div>
  );
};

export default ProfilePageSkeleton;
