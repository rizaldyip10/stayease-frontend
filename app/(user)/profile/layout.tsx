import UserMenu from "@/app/(user)/profile/_components/UserMenu";
import { ReactNode } from "react";
import MenuMobileBtn from "@/app/(user)/profile/_components/MenuMobileBtn";
import ProtectedRoute from "@/components/hoc/ProtectedRoute";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    // <ProtectedRoute>
      <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-0">
        <UserMenu />
        <div className="lg:hidden">
          <MenuMobileBtn />
        </div>
        <div className="w-full lg:ml-[276px] bg-white p-5 lg:p-10 border border-gray-200 rounded-md">
          {children}
        </div>
      </div>
    // </ProtectedRoute>
  );
};

export default ProfileLayout;
