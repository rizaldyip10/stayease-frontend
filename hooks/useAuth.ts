"use client";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  AuthResponse,
  authService,
  RegisterResponse,
} from "@/services/authService";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEffect, useState } from "react";
import { UserType } from "@/constants/Types";
import { FormikValues } from "formik";

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
    const cachedAuth = queryClient.getQueryData(["auth"]);
    if (cachedAuth) {
      console.log("Cached auth:", cachedAuth);
      setIsLoading(false);
    } else {
      console.log("No cached auth");
      const token = localStorage.getItem("accessToken");
      if (token) {
        authService.setAccessToken(token);
        refetch().finally(() => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    }
  }, [refetch, queryClient]);

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
    { token: string; values: FormikValues }
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

  const loginMutation = useMutation<
    AuthResponse,
    Error,
    { values: FormikValues; isOAuth?: boolean; isNew?: boolean }
  >({
    mutationFn: ({ values, isOAuth = false, isNew = false }) =>
      authService.login(values, isOAuth, isNew),
    onSuccess: (data, isOAuth) => {
      const serializableData = {
        id: data.id,
        email: data.email,
        userType: data.userType,
        firstName: data.firstName,
        lastName: data.lastName,
        isVerified: data.isVerified,
        isOAuth2: data.isOAuth2,
        // Omit token for security reasons
      };
      localStorage.setItem("accessToken", data.token.accessToken);
      authService.setAccessToken(data.token.accessToken);
      queryClient.setQueryData(["auth"], serializableData);
      // Store only non-sensitive user info
      localStorage.setItem("userId", data.id);
      // TODO change
      if (!isOAuth) {
        router.push("/check-email");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      authService.setAccessToken(null);
      queryClient.setQueryData(["auth"], null);
      router.push("/");
    },
  });

  const initiateGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/google`;
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
    login: loginMutation.mutateAsync,
    register: registerMutation.mutate,
    verify: verifyMutation.mutate,
    logout: logoutMutation.mutate,
    initiateGoogleLogin,
  };
}
