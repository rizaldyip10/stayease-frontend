"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidePicture from "@/app/(auth)/_components/SidePicture";
import AuthFormSection from "@/app/(auth)/_components/AuthFormSection";
import AuthPage from "@/app/(auth)/_components/AuthPage";
import { useSearchParams } from "next/navigation";
import { useCheckToken } from "@/hooks/auth/useCheckToken";
import GlobalLoading from "@/components/GlobalLoading";
import ErrorComponent from "@/components/ErrorComponent";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const { isTokenValid, isLoading, error } = useCheckToken({
    formType: "forgotPassword",
    token: token,
  });

  if (isTokenValid === null) {
    return <GlobalLoading fullPage />;
  }

  if (!isTokenValid) {
    return (
      <ErrorComponent message="Invalid token. Please make sure you follow the correct link sent to your email!" />
    );
  }

  return (
    <AuthPage
      formType="forgotPassword"
      pictureSrc={`https://res.cloudinary.com/duxay6ujg/image/upload/v1726766674/isabella-abreu-0lJDg5PhO0Q-unsplash_v2il9w.png`}
      sidePic="left"
    />
  );
};

export default Page;
