import React from "react";
import { FormType, UserType } from "@/constants/Types";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import * as yup from "yup";
import { whiteSpaceRegex } from "@/constants/WhiteSpaceRegex";
import FormikInput from "@/components/FormikInput";
import { Button } from "@/components/ui/button";
import { getValidationSchema } from "@/utils/validationSchema";
import FormInputs from "@/app/(auth)/components/FormInputs";

interface AuthFormProps {
  formType: FormType;
  onSubmit: (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>,
  ) => void;
  initialValues: FormikValues;
  userType: UserType;
}

const AuthForm: React.FC<AuthFormProps> = ({
  formType,
  onSubmit,
  initialValues,
  userType,
}) => {
  const schema = getValidationSchema(formType);

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form className="w-full flex flex-col gap-4">
            <FormInputs formType={formType} />
            <Button
              type="submit"
              className="bg-appblue-900 w-full"
              disabled={!(isValid && dirty) || isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : formType === "register"
                  ? "Create Account as a " + `${userType}`
                  : formType === "login"
                    ? "Login to your Account"
                    : "Set Password"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
