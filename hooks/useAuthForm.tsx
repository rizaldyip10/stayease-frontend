import { useState } from "react";
import { AlertType, FormType, UserType } from "@/constants/Types";
import { FormikHelpers, FormikValues } from "formik";
import { MultiStepFormValues } from "@/app/(auth)/_components/MultiStepForm";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface UseAuthFormProps {
  userType: UserType;
}

const UseAuthForm = ({ userType }: UseAuthFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertType>("Success");
  const [showAlert, setShowAlert] = useState(false);

  const { register, verify } = useAuth();

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
        const result = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        setMessage("Login successful!");
        setAlertType("Success");
      } else {
        await register({ email: values.email, userType });
        setMessage(
          "Register successful! Please check your email for further instructions!",
        );
        setAlertType("Success");
        setLoading(false);
      }
    } catch (error: any) {
      const errorMessage = "An error occurred";
      setError(errorMessage);
      setMessage(errorMessage);
      setAlertType("Error");
      setShowAlert(true);
      console.error("Error details:", error?.response?.data?.message);
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
    setLoading(true);
    setError(null);
    setAlertType("Success");

    try {
      const response = await verify({ token, values });

      console.log(response);
      // TODO handle success (store token, redirect, etc)

      setMessage("Registration completed successfully, please sign in!");
      // TODO : ALerts
      // setAlertType("Success");
      // setShowAlert(true);
      // TODO: handle success verification: redirect to login page
      alert(
        "Registration completed successfully. Please login. This is from FE",
      );
      router.push("/login");
    } catch (error: any) {
      const errorMessage = "An error occurred";
      console.log(
        "Error during registration verification:",
        error?.response?.data?.message,
      );
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
