"use client";
import React, { useState } from "react";
import CustomAlert from "@/components/CustomAlert";
import Image from "next/image";
import { FormType, UserType } from "@/constants/Types";
import useAuthForm from "@/hooks/useAuthForm";
import AuthCard from "@/app/(auth)/_components/AuthCard";
import MultiStepForm from "@/app/(auth)/_components/MultiStepForm";
import { useSearchParams } from "next/navigation";

interface AuthFormProps {
  className?: string;
  formType: FormType;
}

const AuthFormSection: React.FC<AuthFormProps> = ({
  className,
  formType,
}: {
  className?: string;
  formType: FormType;
}) => {
  const [userType, setUserType] = useState<UserType>("user");
  const { message, alertType, showAlert, setShowAlert, handleMultiStepSubmit } =
    useAuthForm({
      userType,
    });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div className={className}>
      <div className="md:grid grid-rows-[1fr_4fr_1fr] gap-5 shrink-0 max-h-svh">
        <div className="md:mb-0">
          <Image
            src="/stayease-logo.webp"
            alt="logo"
            height={50}
            width={150}
            className="hidden md:block mx-auto shrink-0"
          />
          {formType === "verify" && (
            <div>
              <p className="font-semibold text-appblue-900 text-xl text-center md:hidden">
                Complete your registration!
              </p>
            </div>
          )}
        </div>
        <div className="overflow-hidden flex flex-col items-center justify-between text-left text-sm text-gray-900">
          <div className="flex flex-col items-center justify-start py-0 md:px-8">
            {showAlert && (
              <CustomAlert
                className={`z-50 top-1/2 -translate-y-full md:max-w-[500px] max-w-[300px] bg-white fixed left-1/2 transform -translate-x-1/2`}
                title={alertType}
                message={message}
                onClose={() => setShowAlert(false)}
              />
            )}
            {formType === "verify" && token ? (
              <MultiStepForm
                userType={userType}
                onSubmit={handleMultiStepSubmit}
                token={token}
              />
            ) : (
              <AuthCard
                formType={formType}
                userType={userType}
                setUserType={setUserType}
              />
            )}
          </div>
        </div>
        <div />
      </div>
    </div>
  );
};

export default AuthFormSection;
