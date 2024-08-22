import React from "react";
import { FormType, UserType } from "@/constants/Types";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import * as yup from "yup";
import { whiteSpaceRegex } from "@/constants/WhiteSpaceRegex";
import FormikInput from "@/components/FormikInput";
import { Button } from "@/components/ui/button";

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
  let schema = null;

  formType === "login"
    ? (schema = yup.object().shape({
        email: yup
          .string()
          .email("Please enter valid email")
          .required("Please enter your email"),
        password: yup
          .string()
          .min(6, "Please enter your valid password")
          .required("Please enter your password")
          .matches(whiteSpaceRegex, "Please enter valid password"),
      }))
    : (schema = yup.object().shape({
        email: yup
          .string()
          .email("Please enter valid email")
          .required("Please enter your email"),
      }));

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form className="w-full flex flex-col gap-4">
            <FormikInput
              as="input"
              name="email"
              className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
              label="Email"
            />
            {formType === "login" && (
              <FormikInput
                as="input"
                name="password"
                className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
                label="Password"
                type="password"
              />
            )}
            <Button
              type="submit"
              className="bg-appblue-900 w-full"
              disabled={!(isValid && dirty) || isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : formType === "register"
                  ? "Create Account as a " + `${userType}`
                  : "Login to your Account"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
