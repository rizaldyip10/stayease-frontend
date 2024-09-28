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
      const session = await getSession();
      const email = session?.user?.email;

      await authService.logout(email);
      logger.info("Backend logout successful");

      await signOut(options);
      const event = new Event("visibilitychange");
      document.dispatchEvent(event);
      showAlert("success", "You have been logged out!");
    } catch (error: any) {
      if (error.response) {
        logger.error("Backend logout failed", { error });
        setError(
          error.response.data?.message || "An error occurred while logging out",
        );
      } else {
        logger.error("Frontend logout failed", { error });
        setError("An error occurred while logging out");
      }
      showAlert(
        "error",
        error.message || "An error occurred while logging out",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, handleSignOut };
};
