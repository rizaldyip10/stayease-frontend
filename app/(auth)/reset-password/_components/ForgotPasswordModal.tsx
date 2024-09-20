import React from "react";
import { Formik, Form } from "formik";
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

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { forgotPassword, isLoading, error } = useForgotPassword();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await forgotPassword(values.email);
            setSubmitting(false);
            if (!error) {
              onClose();
            }
          }}
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
                {isSubmitting || isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
