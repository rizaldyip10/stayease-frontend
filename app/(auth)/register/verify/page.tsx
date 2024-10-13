"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import AuthPage from "@/app/(auth)/_components/AuthPage";
import ErrorComponent from "@/components/ErrorComponent";
import GlobalLoading from "@/components/GlobalLoading";
import { useCheckToken } from "@/hooks/auth/useCheckToken";

const VerificationPage: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const { isTokenValid, isLoading, error } = useCheckToken({
    formType: "verify",
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
      formType="verify"
      pictureSrc={`https://res.cloudinary.com/duxay6ujg/image/upload/v1726766691/verify_dp76xw.webp`}
      sidePic="left"
    />
  );
};

export default VerificationPage;
