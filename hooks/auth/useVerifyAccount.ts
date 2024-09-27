import { useState } from "react";
import { FormikHelpers } from "formik";
import { MultiStepFormValues } from "@/app/(auth)/_components/MultiStepForm";
import { useGoogleLogin } from "@/hooks/auth/useGoogleLogin";
import authService from "@/services/authService";
import { useAlert } from "@/context/AlertContext";

export const useVerifyAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showAlert } = useAlert();

  const handleMultiStepSubmit = async (
    values: MultiStepFormValues,
    token: string,
    actions: FormikHelpers<MultiStepFormValues>,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.verify(values, token);
      showAlert("success", response.statusMessage, "/login");
    } catch (error: any) {
      setError("An error occurred");
      console.error("Error during registration verification:", error);
      showAlert("error", error.message);
    } finally {
      setLoading(false);
      actions.setSubmitting(false);
    }
  };

  return { loading, error, handleMultiStepSubmit };
};
