"use client";
import { ReactNode } from "react";
import Sidebar from "@/app/dashboard/_components/Sidebar";
import Navbar from "@/app/dashboard/_components/Navbar";
import { ProfileProvider } from "@/context/ProfileContext";
import { AlertProvider } from "@/context/AlertContext";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AlertProvider>
      <ProfileProvider>
        <main className="w-full flex min-h-screen bg-[#FAFAFA]">
          <Sidebar />
          <div className="lg:ml-64 relative flex flex-col w-full bg-[#FAFAFA]">
            <Navbar />
            <div className="w-full p-3 md:p-7">{children}</div>
          </div>
        </main>
      </ProfileProvider>
    </AlertProvider>
  );
};

export default DashboardLayout;
