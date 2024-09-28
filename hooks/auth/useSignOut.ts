import { useAlert } from "@/context/AlertContext";
import { useState } from "react";
import { getSession, signOut } from "next-auth/react";
import authService from "@/services/authService";
import logger from "@/utils/logger";

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showAlert } = useAlert();

  const handleSignOut = async (options?: {
    callbackUrl?: string;
    redirect?: boolean;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call backend logout endpoint
      const session = await getSession();
      const email = session?.user?.email;
      await authService.logout(email);
      logger.info("Backend logout successful");
      showAlert("success", "You have been logged out!");
    } catch (error: any) {
      logger.error("Backend logout failed", { error });
      setError(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while logging out",
      );
      showAlert("error", error ? error : "An error occurred while logging out");
    } finally {
      const event = new Event("visibilitychange");
      document.dispatchEvent(event);
    }
    // Perform the original signOut from next-auth
    return signOut(options);
  };

  return { isLoading, error, handleSignOut };
};
