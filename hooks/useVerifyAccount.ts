import { useState } from "react";
import { FormikHelpers } from "formik";
import { MultiStepFormValues } from "@/app/(auth)/_components/MultiStepForm";
import { useAuth } from "@/hooks/useAuth";

export const useVerifyAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { verify } = useAuth();

  const handleMultiStepSubmit = async (
    values: MultiStepFormValues,
    token: string,
    actions: FormikHelpers<MultiStepFormValues>,
  ) => {
    setLoading(true);
    setError(null);
    try {
      await verify({ token, values });
    } catch (error: any) {
      setError("An error occurred");
      console.error("Error during registration verification:", error);
    } finally {
      setLoading(false);
      actions.setSubmitting(false);
    }
  };

  return { loading, error, handleMultiStepSubmit };
};
