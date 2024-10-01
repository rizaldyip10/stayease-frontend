"use client";
import React, { useEffect } from "react";
import SidePicture from "@/app/(auth)/_components/SidePicture";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import AuthFormSection from "@/app/(auth)/_components/AuthFormSection";
import PageWrapper from "@/components/PageWrapper";
import AuthPage from "@/app/(auth)/_components/AuthPage";

const LogIn: React.FC = () => {
  return (
    <div>
      <AuthPage
        formType="login"
        pictureSrc={`/login-pic.webp`}
        sidePic="left"
      />
    </div>
  );
};

export default LogIn;
