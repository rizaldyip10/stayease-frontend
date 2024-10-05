import { useState } from "react";
import { FormType, UserType } from "@/constants/Types";
import { FormikHelpers, FormikValues } from "formik";
import { signIn } from "next-auth/react";
import { useAlert } from "@/context/AlertContext";
import authService from "@/services/authService";

export const useCredentialSubmission = (userType: UserType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showAlert } = useAlert();

  const handleLogin = async (values: FormikValues) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.error) {
      throw new Error(result.error);
    }
    showAlert("success", "Login successful!", "/dashboard");
  };

  const handleRegister = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await authService.register(email, userType);
      showAlert("success", result.message, "/");
    } catch (error: any) {
      setError(error.message);
      showAlert("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>,
    formType: FormType,
  ) => {
    setIsLoading(true);
    setError(null);
    actions.setSubmitting(true);

    try {
      if (formType === "login") {
        await handleLogin(values);
      } else if (formType === "register") {
        await handleRegister(values.email);
      }
    } catch (error: any) {
      setError("An error occurred");
      showAlert("error", error.message);
      console.error("Error details:", error);
    } finally {
      setIsLoading(false);
      actions.setSubmitting(false);
    }
  };

  return { isLoading, error, handleSubmit };
};
