import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getValidationSchema } from "@/utils/validationSchema";
import FormInputs from "@/app/(auth)/_components/FormInputs";

interface ResetPasswordProps {
  token: string;
}
const ResetPassword: React.FC<ResetPasswordProps> = ({ token }) => {
  const router = useRouter();
  const { resetPassword, isLoading, error } = useForgotPassword();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold text-blue-950 mb-4 text-center">
        Reset Password
      </h1>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={getValidationSchema("forgotPassword")}
        onSubmit={async (values, { setSubmitting }) => {
          await resetPassword(token as string, values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <FormInputs formType="forgotPassword" />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-blue-950 text-white hover:bg-blue-900"
            >
              {isSubmitting || isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
