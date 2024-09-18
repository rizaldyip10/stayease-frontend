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
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const { register, verify } = useAuth();

  const router = useRouter();

  const showAlert = (type: AlertType, message: string) => {
    setAlertInfo({ show: true, type, message });
    setTimeout(() => {
      setAlertInfo({ show: false, type: "success", message: "" });
      if (type === "success") {
        router.push("/dashboard");
      }
    }, 3000);
  };

  const hideAlert = () => {
    setAlertInfo({ show: false, type: "success", message: "" });
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
        const result = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (result?.error) {
          showAlert("error", result.error);
        } else {
          showAlert("success", "Login successful!");
        }
      } else if (formType === "register") {
        await register({ email: values.email, userType });
        showAlert("success", "Registration successful! Please log in.");
        setLoading(false);
      }
    } catch (error: any) {
      const errorMessage = "An error occurred";
      setError(errorMessage);
      showAlert("error", error.message);
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

    try {
      const response = await verify({ token, values });

      console.log(response);

      showAlert("success", "Verification successful! Please log in.");
      router.push("/login");
    } catch (error: any) {
      const errorMessage = "An error occurred";
      console.log(
        "Error during registration verification:",
        error?.response?.data?.message,
      );
      setError(errorMessage);
      showAlert("error", error.message);

      console.error("Error during registration verification:", error);
    } finally {
      setLoading(false);
      actions.setSubmitting(false);
    }
  };

  return {
    loading,
    error,
    showAlert,
    alertInfo,
    hideAlert,
    handleSubmit,
    handleMultiStepSubmit,
  };
};
export default UseAuthForm;
