"use client";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { useState } from "react";
import { UserType } from "@/constants/Types";
import { RegisterResponse } from "@/constants/Auth";
import { MultiStepFormValues } from "@/app/(auth)/_components/MultiStepForm";
import { signIn as nextAuthSignIn, useSession } from "next-auth/react";
import { useAlert } from "@/context/AlertContext";

export function useGoogleLogin() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status, update } = useSession();
  const { showAlert } = useAlert();

  const handleGoogleLogin = async () => {
    try {
      const result = await nextAuthSignIn("google", { redirect: true });

      if (session?.user?.isNewUser) {
        showAlert(
          "success",
          "Please continue to select your user type.",
          "/register/select-user-type",
        );
      } else {
        showAlert("success", "Login successful.", "/dashboard");
      }
    } catch (error: any) {
      console.error("Google login failed:", error);
      showAlert("error", "Google login failed. " + error);
      setError(error);
    }
  };

  return {
    isLoading,
    error,
    googleLogin: handleGoogleLogin,
  };
}
