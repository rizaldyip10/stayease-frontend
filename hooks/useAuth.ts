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
import { signIn as nextAuthSignIn } from "next-auth/react";

export function useAuth() {
  const queryClient: QueryClient = useQueryClient();
  const router: AppRouterInstance = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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
      // Show success message
      alert(data.message);
      // TODO clear form
      // TODO: Redirect to a "Check your email" page
      router.push("/");
    },
    onError: (error) => {
      // Handle error (show error message, etc.)
      console.error("Registration failed:", error.message);
      alert("Registration failed. Please try again.");
    },
  });

  const verifyMutation = useMutation<
    any,
    Error,
    { token: string; values: MultiStepFormValues }
  >({
    mutationFn: ({ values, token }) => authService.verify(values, token),
    onSuccess: (data) => {
      // Show success message
      alert(data.statusMessage);
      // Redirect to login page
      router.push("/login");
    },
    onError: (error) => {
      // Handle error (show error message, etc.)
      console.error("Verification failed:", error.message);
      alert("Verification failed. Please try again.");
    },
  });

  const handleGoogleLogin = async () => {
    try {
      await nextAuthSignIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Google login failed:", error);
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
