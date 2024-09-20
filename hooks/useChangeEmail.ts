import { useState } from "react";
import { useAlert } from "@/context/AlertContext";
import { signOut } from "@/auth";
import { profileService } from "@/services/profileService";

export const useChangeEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showAlert } = useAlert();

  const initiateChangeEmail = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await profileService.changeEmailRequest(email);
      showAlert(
        "success",
        "Email change request sent successfully, please check your email to verify the change.",
      );
    } catch (error: any) {
      setError(error.message);
      showAlert("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const completeChangeEmail = async (token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await profileService.verifyEmailChange(token);
      showAlert("success", "Email change successful");
      await signOut({ redirect: true });
    } catch (error: any) {
      setError(error.message);
      showAlert("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { initiateChangeEmail, completeChangeEmail, isLoading, error };
};
