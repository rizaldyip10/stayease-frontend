"use client";
import React from "react";
import MenuRoutes from "@/app/(user)/profile/_components/MenuRoutes";
import { useProfile } from "@/hooks/useProfile";
import Image from "next/image";

const UserMenu = () => {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!profile) return <div>No profile data available</div>;
  if (profile) {
    console.log(profile);
  }

  const fullName = profile.firstName + " " + (profile.lastName ?? "");
  const joinedAt = new Date(profile.joinedAt).toLocaleDateString();

  return (
    <div className="w-64 absolute bg-white hidden lg:flex flex-col gap-3 p-5 border border-gray-200 rounded-md">
      <h1 className="text-blue-950 font-semibold mb-4">My Profile</h1>
      <div className="flex flex-col items-center gap-3 w-full border-b border-gray-200 pb-5">
        <div className="w-[150px] h-[150px] rounded-full flex items-center justify-center border border-gray-200 bg-white">
          <Image
            src={`${profile.avatar}`}
            width={140}
            height={140}
            alt="avatar"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-sm text-blue-950 font-medium">{fullName}</h1>
          <p className="text-xs text-blue-950 text-opacity-50">
            Joined at {joinedAt}
          </p>
        </div>
      </div>
      <MenuRoutes />
    </div>
  );
};

export default UserMenu;
