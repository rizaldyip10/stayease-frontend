"use client";
import React, { useEffect, useState } from "react";
import AuthFormSection from "@/app/(auth)/_components/AuthFormSection";
import { AnimatePresence, motion } from "framer-motion";
import SidePicture from "@/app/(auth)/_components/SidePicture";
import { notFound, useSearchParams } from "next/navigation";
import { authService } from "@/services/authService";
import AuthPage from "@/app/(auth)/_components/AuthPage";

const VerificationPage: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        const response = await authService.checkToken(token);
        if (response.statusCode === 200) {
          setIsValidToken(true);
        } else if (response.statusCode === 400) {
          setIsValidToken(false);

          // TODO: redirect to a specific error page?
          notFound();
        }
      } else {
        setIsValidToken(false);
      }
    };
  }, [token]);

  if (!token) {
    notFound(); // This will trigger a 404 response
    return null;
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
