"use client";
import { ReactNode } from "react";
import { AlertProvider } from "@/context/AlertContext";
import { AnimatePresence } from "framer-motion";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AlertProvider>
      <div className="w-full min-h-screen flex items-center justify-center bg-[#FAFAFA] py-5">
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </div>
    </AlertProvider>
  );
};

export default AuthLayout;
