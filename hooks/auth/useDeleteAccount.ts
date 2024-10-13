import { useState } from "react";
import { useAlert } from "@/context/AlertContext";
import { profileService } from "@/services/profileService";
import { useSignOut } from "@/hooks/auth/useSignOut";

export const useDeleteAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showAlert } = useAlert();
  const { handleSignOut } = useSignOut();

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await profileService.deleteAccount();
      showAlert("success", "Account deleted successfully");
    } catch (error: any) {
      showAlert("error", error);
      setError(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      await handleSignOut({ redirect: true });
    }
  };

  return { isOpen, setIsOpen, isLoading, error, handleDeleteAccount };
};
