import { useState } from "react";
import { useAlert } from "@/context/AlertContext";
import { useRouter } from "next/navigation";
import authService from "@/services/authService";
import { ForgotPasswordValues } from "@/constants/Auth";

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { showAlert } = useAlert();
  const router = useRouter();

  const forgotPassword = async (email: string): Promise<any> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await authService.forgotPassword(email);
      setIsSuccess(true);
      showAlert(
        "success",
        "Password reset instructions sent! Please check your email.",
      );
      return response;
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to send reset link. Please try again.");
      }
      showAlert("error", "Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (
    token: string,
    passwordValues: ForgotPasswordValues,
  ): Promise<any> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await authService.resetPassword(token, passwordValues);
      setIsSuccess(true);
      showAlert(
        "success",
        "Password reset successful! Please log in.",
        "/login",
      );
      return response;
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to reset password. Please try again.");
      }
      showAlert("error", "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, forgotPassword, resetPassword };
};