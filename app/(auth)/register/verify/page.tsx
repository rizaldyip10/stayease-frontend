"use client";
import React, { useEffect, useState } from "react";
import AuthFormSection from "@/app/(auth)/_components/AuthFormSection";
import { AnimatePresence, motion } from "framer-motion";
import SidePicture from "@/app/(auth)/_components/SidePicture";
import { notFound, useSearchParams } from "next/navigation";
import { authService } from "@/services/authService";

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
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: "-25px" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "25px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="shadow-md rounded-lg w-full max-w-5xl mx-auto"
      >
        <div className="bg-white flex flex-row items-center justify-center p-5 my-auto">
          <SidePicture
            alt="verify"
            src="/verify.webp"
            className="hidden md:block md:w-3/5"
          />
          <div className="w-full md:w-2/5 h-full flex items-center justify-center">
            <AuthFormSection
              formType="verify"
              className="form mb-2 w-full max-w-sm px-4"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VerificationPage;
