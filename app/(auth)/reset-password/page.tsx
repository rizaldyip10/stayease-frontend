"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidePicture from "@/app/(auth)/_components/SidePicture";
import AuthFormSection from "@/app/(auth)/_components/AuthFormSection";
import AuthPage from "@/app/(auth)/_components/AuthPage";

const Page = () => {
  return (
    <AuthPage
      formType="forgotPassword"
      pictureSrc={`https://res.cloudinary.com/duxay6ujg/image/upload/v1726766674/isabella-abreu-0lJDg5PhO0Q-unsplash_v2il9w.png`}
      sidePic="left"
    />
  );
};

export default Page;
