import { useState } from "react";
import { FormType, UserType } from "@/constants/Types";
import { FormikHelpers, FormikValues } from "formik";
import { signIn } from "next-auth/react";
import { useAuth } from "@/hooks/useAuth";
import { useAlert } from "@/context/AlertContext";

export const useCredentialSubmission = (userType: UserType) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, verify } = useAuth();
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
    await register({ email, userType });
    showAlert(
      "success",
      "Registration successful! Please check your email for further instructions!",
    );
  };

  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>,
    formType: FormType,
  ) => {
    setLoading(true);
    setError(null);

    try {
      if (formType === "login") {
        await handleLogin(values);
      } else if (formType === "register") {
        await handleRegister(values.email);
      }
    } catch (error: any) {
      setError("An error occurred");
      showAlert("error", error.message);
      console.error("Error details:", error?.response?.data?.message);
    } finally {
      setLoading(false);
      actions.setSubmitting(false);
    }
  };

  return { loading, error, handleSubmit };
};
