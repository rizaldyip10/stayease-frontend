import React from "react";
import { FormType, UserType } from "@/constants/Types";
import { Form, Formik, FormikValues } from "formik";
import { Button } from "@/components/ui/button";
import { getValidationSchema } from "@/utils/validationSchema";
import FormInputs from "@/app/(auth)/_components/FormInputs";
import ChangeCredentialButton from "@/app/(user)/profile/settings/_components/ChangeCredentialButton";
import { useCredentialSubmission } from "@/hooks/auth/useCredentialSubmission";
import GlobalLoading from "@/components/GlobalLoading";

interface AuthFormProps {
  formType: FormType;
  initialValues: FormikValues;
  userType: UserType;
}

const AuthForm: React.FC<AuthFormProps> = ({
  formType,
  initialValues,
  userType,
}) => {
  const schema = getValidationSchema(formType);
  const { isLoading, error, handleSubmit } = useCredentialSubmission(userType);

  if (isLoading) return <GlobalLoading fullPage />;

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions, formType);
        }}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form className="w-full flex flex-col gap-4">
            <FormInputs formType={formType} />
            <Button
              type="submit"
              className="bg-blue-950 w-full text-white"
              disabled={!(isValid && dirty) || isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : formType === "register"
                  ? "Create Account as a " +
                    `${userType.toLowerCase().charAt(0).toUpperCase() + userType.toLowerCase().slice(1)}`
                  : "Login to your Account"}
            </Button>
          </Form>
        )}
      </Formik>
      {formType === "login" && (
        <div className="mt-3 text-center">
          <ChangeCredentialButton
            variant="link"
            title="Forgot Password?"
            isPasswordReset={true}
          />
        </div>
      )}
    </div>
  );
};

export default AuthForm;
