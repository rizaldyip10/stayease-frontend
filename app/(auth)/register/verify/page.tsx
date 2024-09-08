"use client";
import React from "react";
import AuthFormSection from "@/app/(auth)/_components/AuthFormSection";
import { AnimatePresence, motion } from "framer-motion";
import SidePicture from "@/app/(auth)/_components/SidePicture";
import { notFound, useSearchParams } from "next/navigation";

const VerificationPage: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    notFound(); // This will trigger a 404 response
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: "-25px" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "25px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="shadow-md rounded-lg"
      >
        <div className="bg-white max-h-screen md:h-1/3 flex flex-row items-center justify-center p-5 my-auto">
          <SidePicture
            alt="verify"
            src="/verify.webp"
            className="hidden md:flex"
          />
          <AuthFormSection
            formType="verify"
            className="form mb-2 max-w-full h-full md:w-2/5"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VerificationPage;