"use client";
import React from "react";
import AuthFormSection from "@/app/(auth)/_components/AuthFormSection";
import SidePicture from "@/app/(auth)/_components/SidePicture";
import { AnimatePresence, motion } from "framer-motion";

const Register: React.FC = () => {
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
            formType="register"
            className="form mb-2 w-full h-full md:w-2/5"
          />
          <SidePicture
            alt="sign-up"
            src="/sign-up-side-pic.webp"
            className="hidden md:flex"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Register;
