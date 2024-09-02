import { useState } from "react";
import { AlertType, FormType, UserType } from "@/constants/Types";
import { FormikHelpers, FormikValues } from "formik";
import axios from "axios";
import { MultiStepFormValues } from "@/app/(auth)/_components/MultiStepForm";

interface UseAuthFormProps {
  userType: UserType;
}

const UseAuthForm = ({ userType }: UseAuthFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertType>("Success");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>,
    formType: FormType,
  ) => {
    setLoading(true);
    setError(null);

    const endpoint =
      formType === "login"
        ? "http://localhost:8080/api/v1/auth/login"
        : `http://localhost:8080/api/v1/auth/register?userType?=${userType}`;

    try {
      const response = await axios.post(endpoint, values, {
        headers: { "Content-Type": "application/json" },
      });

      const data = response.data;
      // TODO handle success (store token, redirect, etc)

      if (response.status == 200) {
        setMessage(data.data.message);
        setAlertType("Success");
        setShowAlert(true);
      } else {
        setMessage(data.message || "Something went wrong");
        setAlertType("Error");
        setShowAlert(true);
      }
    } catch (error) {
      setError("An error occurred");
      // TODO handle error

      console.error(error);
      setMessage("An error occurred, please try again later");
      setAlertType("Error");
      setShowAlert(true);
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

    const endpoint = `http://localhost:8080/api/v1/auth/register/verify/token?=${token}`;

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
    } catch (error) {
      setError("An error occurred");
      // TODO handle error

      console.error(error);
      setMessage("An error occurred, please try again later");
      setAlertType("Error");
      setShowAlert(true);
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
