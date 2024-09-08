import { useState } from "react";
import { AlertType, FormType, UserType } from "@/constants/Types";
import { FormikHelpers, FormikValues } from "formik";
import axios from "axios";
import { MultiStepFormValues } from "@/app/(auth)/_components/MultiStepForm";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface UseAuthFormProps {
  userType: UserType;
}

const UseAuthForm = ({ userType }: UseAuthFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertType>("Success");
  const [showAlert, setShowAlert] = useState(false);

  const { login, register } = useAuth();

  const router = useRouter();

  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>,
    formType: FormType,
  ) => {
    setLoading(true);
    setError(null);

    try {
      if (formType === "login") {
        await login({ values });
        console.log(values);
        setMessage("Login successful!");
        setAlertType("Success");
        router.push("/check-email");
        setLoading(false);
      } else {
        await register({ email: values.email, userType });
        setMessage(
          "Register successful! Please check your email for further instructions!",
        );
        setAlertType("Success");
        setLoading(false);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      setError(errorMessage);
      setMessage(errorMessage);
      setAlertType("Error");
      setShowAlert(true);
      console.error("Error details:", error);
    } finally {
      setLoading(false);
      actions.setSubmitting(false);
    }
  };

  const handleMultiStepSubmit = async (
    values: MultiStepFormValues,
    token: string,
    actions: FormikHelpers<MultiStepFormValues>,
  ) => {
    setLoading(false);
    setError(null);

    const endpoint = `http://localhost:8080/api/v1/auth/register/verify?token=${token}`;

    try {
      const response = await axios.post(endpoint, values, {
        headers: { "Content-Type": "application/json" },
      });

      const data = response.data;
      // TODO handle success (store token, redirect, etc)

      if (response.status == 200) {
        setMessage(data.data.message || "Registration completed successfully");
        setAlertType("Success");
        setShowAlert(true);
        // TODO: handle success registration: redirect to home page
        // router.push("/").then(r => )
      } else {
        setMessage(data.message || "Something went wrong");
        setAlertType("Error");
        setShowAlert(true);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      setError(errorMessage);
      setMessage(errorMessage);
      setAlertType("Error");
      setShowAlert(true);

      console.error("Error during registration verification:", error);
    } finally {
      setLoading(false);
      actions.setSubmitting(false);
    }
  };

  return {
    loading,
    setLoading,
    error,
    setError,
    message,
    setMessage,
    alertType,
    setAlertType,
    showAlert,
    setShowAlert,
    handleSubmit,
    handleMultiStepSubmit,
  };
};

export default UseAuthForm;