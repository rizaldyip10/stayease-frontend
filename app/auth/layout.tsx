"use client";
import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full md:max-h-screen flex items-center justify-center bg-[#FAFAFA] py-5">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: "-25px" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="shadow-md rounded-lg"
        >
          <div className="bg-white max-h-screen md:h-1/3 flex flex-row items-center justify-center p-5 my-auto">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthLayout;
