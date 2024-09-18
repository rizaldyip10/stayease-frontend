"use client";
import { AnimatePresence, motion } from "framer-motion";
import SidePicture from "@/app/(auth)/_components/SidePicture";
import React from "react";
import SelectUserForm from "@/app/(auth)/register/select-user-type/_components/SelectUserForm";

const SelectUserTypePage: React.FC = () => {
  return (
    <div>
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
              alt="select"
              src={`https://res.cloudinary.com/duxay6ujg/image/upload/v1726642932/select_zotmvs.webp`}
              className="hidden md:flex"
            />
            <SelectUserForm />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SelectUserTypePage;
