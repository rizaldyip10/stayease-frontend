"use client";
import { ReactNode } from "react";
import { AlertProvider } from "@/context/AlertContext";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AlertProvider>
      <div className="w-full min-h-screen flex items-center justify-center bg-[#FAFAFA] py-5">
        {children}
      </div>
    </AlertProvider>
  );
};

export default AuthLayout;
