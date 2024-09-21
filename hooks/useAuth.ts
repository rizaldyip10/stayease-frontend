"use client";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEffect, useState } from "react";
import { UserType } from "@/constants/Types";
import { AuthResponse, RegisterResponse } from "@/constants/Auth";
import { MultiStepFormValues } from "@/app/(auth)/_components/MultiStepForm";
import { signIn as nextAuthSignIn, useSession } from "next-auth/react";
import { useAlert } from "@/context/AlertContext";

export function useAuth() {
  const queryClient: QueryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status, update } = useSession();
  const { showAlert } = useAlert();

  const {
    data: auth,
    refetch,
    isError,
    error,
  } = useQuery<AuthResponse, Error>({
    queryKey: ["auth"],
    // queryFn: authService.checkAuthStatus,
    retry: false,
    enabled: false,
  });

  useEffect(() => {
    if (isError) {
      queryClient.setQueryData(["auth"], null);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [isError, auth, queryClient]);

  const registerMutation = useMutation<
    RegisterResponse,
    Error,
    { email: string; userType: UserType }
  >({
    mutationFn: ({ email, userType }) => authService.register(email, userType),
    onSuccess: (data) => {
      showAlert("success", data.message, "/");
    },
    onError: (error) => {
      console.error("Registration failed:", error.message);
      showAlert("error", "Registration failed. " + error.message);
    },
  });

  const verifyMutation = useMutation<
    any,
    Error,
    { token: string; values: MultiStepFormValues }
  >({
    mutationFn: ({ values, token }) => authService.verify(values, token),
    onSuccess: (data) => {
      showAlert("success", data.statusMessage, "/login");
    },
    onError: (error) => {
      console.error("Verification failed:", error.message);
      showAlert("error", "Verification failed. " + error.message);
    },
  });

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
        showAlert("success", "Login successful.", "/");
      }
    } catch (error) {
      console.error("Google login failed:", error);
      showAlert("error", "Google login failed. " + error);
    }
  };

  return {
    auth: auth
      ? {
          id: auth.id,
          email: auth.email,
          userType: auth.userType,
          isVerified: auth.isVerified,
          firstName: auth.firstName,
          lastName: auth.lastName,
          isOAuth2: auth.isOAuth2,
          // Omit token from the returned object
        }
      : null,
    isLoading,
    isError,
    error: error ? error.message : null,
    register: registerMutation.mutate,
    verify: verifyMutation.mutate,
    googleLogin: handleGoogleLogin,
  };
}
