"use client";
import React, { useState } from "react";
import CustomAlert from "@/components/CustomAlert";
import logo from "@/assets/images/logo_horizontal.png";
import Image from "next/image";
import { FormType, UserType } from "@/constants/Types";
import useAuthForm from "@/hooks/useAuthForm";
import AuthCard from "@/app/(auth)/components/AuthCard";

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

  const { message, alertType, showAlert, setShowAlert } = useAuthForm({
    userType,
  });

  return (
    <div className={className}>
      <div className="md:grid grid-rows-[1fr_4fr_1fr] shrink-0 max-h-svh">
        <div>
          <Image
            src={logo}
            alt="logo"
            height={50}
            className="hidden md:flex mx-auto shrink-0"
          />
        </div>
        <div className="self-stretch overflow-hidden flex flex-col items-center justify-between text-left text-sm text-gray-900">
          <div className="self-stretch flex flex-col items-center justify-start py-0 md:px-8">
            {showAlert && (
              <CustomAlert
                className={`z-50 top-1/2 -translate-y-full md:max-w-[500px] max-w-[300px] bg-white fixed left-1/2 transform -translate-x-1/2`}
                title={alertType}
                message={message}
                onClose={() => setShowAlert(false)}
              />
            )}
            <AuthCard
              formType={formType}
              userType={userType}
              setUserType={setUserType}
            />
          </div>
        </div>
        <div />
      </div>
    </div>
  );
};

export default AuthFormSection;
