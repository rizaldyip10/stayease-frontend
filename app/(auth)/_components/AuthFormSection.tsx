"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FormType, UserType } from "@/constants/Types";
import useAuthForm from "@/hooks/useAuthForm";
import AuthCard from "@/app/(auth)/_components/AuthCard";
import MultiStepForm from "@/app/(auth)/_components/MultiStepForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { FormikHelpers, FormikValues } from "formik";
import { useSession } from "next-auth/react";
import logger from "@/utils/logger";
import ResetPassword from "@/app/(auth)/reset-password/_components/ResetPassword";

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
  const [userType, setUserType] = useState<UserType>("USER");
  const {
    loading,
    error,
    alertInfo,
    handleSubmit,
    handleMultiStepSubmit,
  } = useAuthForm({ userType });
  const { googleLogin } = useAuth();
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const newUserType = searchParams.get("t") === "t" ? "TENANT" : "USER";

  const onSubmit = (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>,
  ) => {
    handleSubmit(values, actions, formType);
  };

  useEffect(() => {
    logger.info("AuthFormSection", { session });
  }, []);

  const router = useRouter();
  if (session) {
    router.push("/dashboard");
    if (session.user.isNewUser) {
      router.push("/auth/register/select-user-type");
    }
  }

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
            {formType === "verify" && token && newUserType ? (
              <MultiStepForm
                userType={newUserType}
                onSubmit={handleMultiStepSubmit}
                token={token}
              />
            ) : formType === "forgotPassword" && token ? (
              <ResetPassword token={token} />
            ) : (
              <AuthCard
                formType={formType}
                userType={userType}
                setUserType={setUserType}
                onSubmit={onSubmit}
                googleLogin={googleLogin}
                loading={loading}
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
