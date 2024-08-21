"use client";
import React, { useState } from "react";
import Register from "@/app/auth/pages/Register";
import LogIn from "@/app/auth/pages/LogIn";
import { AnimatePresence, motion } from "framer-motion";

const Auth: React.FC = () => {
  const [authType, setAuthType] = useState("login");
  const [formType, setFormType] = useState<"login" | "register">("login");

  const toggleFormType = () => {
    setFormType((prevType) => (prevType === "login" ? "register" : "login"));
  };

  return (
    // <>
    //   <FormSection className="form mb-2 w-full h-full md:w-2/5" />
    //   <SidePicture
    //     alt="sign-up"
    //     src="/sign-up-side-pic.webp"
    //     className="hidden md:flex"
    //   />
    // </>
    <AnimatePresence mode="wait">
      <motion.div
        key={formType}
        initial={{ opacity: 0, y: "-25px" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "25px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="shadow-md rounded-lg"
      >
        {authType === "login" ? <LogIn /> : <Register />}
      </motion.div>
    </AnimatePresence>
  );
};

export default Auth;
