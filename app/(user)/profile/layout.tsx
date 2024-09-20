"use client";
import UserMenu from "@/app/(user)/profile/_components/UserMenu";
import { ReactNode } from "react";
import MenuMobileBtn from "@/app/(user)/profile/_components/MenuMobileBtn";
import { ProfileProvider } from "@/context/ProfileContext";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ProfileProvider>
      <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-0">
        <UserMenu />
        <div className="lg:hidden">
          <MenuMobileBtn />
        </div>
        <div className="w-full lg:ml-[276px] bg-white p-5 lg:p-10 border border-gray-200 rounded-md">
          {children}
        </div>
      </div>
    </ProfileProvider>
  );
};

export default ProfileLayout;
