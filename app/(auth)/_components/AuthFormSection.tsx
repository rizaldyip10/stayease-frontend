"use client";
import React, { useEffect, useState } from "react";
import { FormType, UserType } from "@/constants/Types";
import AuthCard from "@/app/(auth)/_components/AuthCard";
import MultiStepForm from "@/app/(auth)/_components/MultiStepForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useGoogleLogin } from "@/hooks/auth/useGoogleLogin";
import { FormikHelpers, FormikValues } from "formik";
import { useSession } from "next-auth/react";
import logger from "@/utils/logger";
import ResetPassword from "@/app/(auth)/reset-password/_components/ResetPassword";
import SelectUserForm from "@/app/(auth)/register/select-user-type/_components/SelectUserForm";
import GlobalLoading from "@/components/GlobalLoading";
import { useCredentialSubmission } from "@/hooks/auth/useCredentialSubmission";

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
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const newUserType = searchParams.get("t") === "t" ? "TENANT" : "USER";

  const router = useRouter();
  if (session && formType !== "forgotPassword") {
    router.push("/dashboard");
    if (session.user.isNewUser) {
      router.push("/register/select-user-type");
    }
  }

  if (formType === "userType") return <SelectUserForm />;

  return (
    <div className={className}>
      <div className="md:grid grid-rows-[1fr_4fr_1fr] gap-3 shrink-0 h-full">
        <div className="md:mb-0">
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
              <MultiStepForm userType={newUserType} token={token} />
            ) : formType === "forgotPassword" && token ? (
              <ResetPassword token={token} />
            ) : (
              <AuthCard formType={formType} />
            )}
          </div>
        </div>
        <div />
      </div>
    </div>
  );
};

export default AuthFormSection;
