"use client";
import React, { useState } from "react";
import MenuRoutes from "@/app/(user)/profile/_components/MenuRoutes";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import AvatarUploadModal from "@/app/(user)/profile/_components/AvatarUploadModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/context/ProfileContext";
import { useSession } from "next-auth/react";
import UserMenuSkeleton from "@/app/(user)/profile/_components/UserMenuSkeleton";

const UserMenu = () => {
  const { profile, isLoading, error } = useProfile();
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading || !profile) return <UserMenuSkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  const fullName = profile.firstName + " " + (profile.lastName ?? "");
  const joinedAt = new Date(profile.joinedAt).toLocaleDateString();

  return (
    <div className="w-64 absolute bg-white hidden lg:flex flex-col gap-3 p-5 border border-gray-200 rounded-md">
      <h1 className="text-blue-950 font-semibold mb-4">My Profile</h1>
      <div className="flex flex-col items-center gap-3 w-full border-b border-gray-200 pb-5">
        <div className="relative w-[150px] h-[150px] rounded-full flex items-center justify-center border border-gray-300 bg-white">
          <Avatar className="w-full h-full">
            <AvatarImage src={session?.user?.avatarUrl} alt="avatar" />
            <AvatarFallback className="text-4xl"> {fullName[0]}</AvatarFallback>
          </Avatar>
          <Button
            className="w-7 h-7 absolute bottom-2 right-1 hover:bg-blue-950 p-2 bg-[#FAFAFA] rounded-full shadow-md"
            onClick={() => setIsModalOpen(true)}
          >
            <Pencil size={16} className="text-blue-950 hover:text-gray-200" />
          </Button>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-sm text-blue-950 font-medium">{fullName}</h1>
          <p className="text-xs text-blue-950 text-opacity-50">
            Joined at {joinedAt}
          </p>
        </div>
      </div>
      <MenuRoutes />
      <AvatarUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default UserMenu;
