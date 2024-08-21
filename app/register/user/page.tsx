"use client";
import React from "react";
import SidePicture from "@/app/register/user/components/SidePicture";
import FormSection from "@/app/register/user/components/FormSection";
import { AnimatePresence, motion } from "framer-motion";

const UserRegister: React.FC = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: "-25px" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="bg-white max-h-screen md:h-1/3 flex flex-row items-center justify-center p-5 my-auto">
          <FormSection className="form mb-2 w-full h-full md:w-2/5" />
          <div className="hidden md:flex">
            <SidePicture alt="sign-up" src="/sign-up-side-pic.webp" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserRegister;
