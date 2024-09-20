import React from "react";
import { Formik, Form, FormikValues } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormikInput from "@/components/FormikInput";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { useChangeEmail } from "@/hooks/useChangeEmail";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPasswordReset: boolean;
}

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
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
    if (isPasswordReset) {
      await forgotPassword(values.email);
    } else {
      await initiateChangeEmail(values.email);
    }
    setSubmitting(false);
    if (!error) {
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
              <Button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full bg-blue-950 text-white hover:bg-blue-900"
              >
                {isSubmitting || isLoading ? "Sending..." : buttonText}
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeCredentialModal;