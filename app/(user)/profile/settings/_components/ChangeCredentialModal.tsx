import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormikInput from "@/components/FormikInput";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { useChangeEmail } from "@/hooks/auth/useChangeEmail";
import LoadingButton from "@/components/LoadingButton";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPasswordReset: boolean;
}

const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
});

const ChangeCredentialModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  isPasswordReset,
}) => {
  const { forgotPassword, isLoading, error } = useForgotPassword();
  const {
    initiateChangeEmail,
    isLoading: emailIsLoading,
    error: emailError,
  } = useChangeEmail();

  const handleSubmit = async (
    values: { email: string },
    { setSubmitting }: any,
  ) => {
    let res;
    if (isPasswordReset) {
      res = await forgotPassword(values.email);
    } else {
      res = await initiateChangeEmail(values.email);
    }
    setSubmitting(false);
    console.log("error", res);
    console.log("emailError", emailError);
    if (!error && !emailError) {
      onClose();
    }
  };

  const title = isPasswordReset ? "Reset Password" : "Change E-mail";
  const buttonText = isPasswordReset
    ? "Send Reset Link"
    : "Send E-mail Verification Link";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <FormikInput
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded"
              />
              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
              {isLoading || isSubmitting ? (
                <LoadingButton title="Sending request..." />
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-blue-950 text-white hover:bg-blue-900"
                >
                  {buttonText}
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeCredentialModal;
