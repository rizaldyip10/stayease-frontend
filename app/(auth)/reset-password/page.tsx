"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidePicture from "@/app/(auth)/_components/SidePicture";
import AuthFormSection from "@/app/(auth)/_components/AuthFormSection";

const Page = () => {
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
          <AuthFormSection
            formType="forgotPassword"
            className="form mb-2 w-full h-full md:w-2/5"
          />
          <SidePicture
            alt="login"
            src={`https://res.cloudinary.com/duxay6ujg/image/upload/v1726766674/isabella-abreu-0lJDg5PhO0Q-unsplash_v2il9w.png`}
            className="hidden md:flex"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Page;
