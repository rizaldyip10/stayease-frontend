import * as yup from "yup";
import FormikInput from "@/components/FormikInput";
import { Form, Formik, FormikHelpers } from "formik";
import { Button } from "@/components/ui/button";
import React from "react";

export interface RegisterFormProps {
  onSubmit: (value: string) => void;
  userType: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

interface RegisterFormValues {
  email: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  userType,
  setEmail,
}) => {
  const registerSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Please enter your email"),
  });

  const initialValue: RegisterFormValues = {
    email: "",
  };

  const handleRegister = (
    value: RegisterFormValues,
    { resetForm }: FormikHelpers<RegisterFormValues>,
  ) => {
    onSubmit(value.email);
    setEmail("");
    resetForm();
    console.log(value);
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValue}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form className="w-full flex flex-col gap-4">
            <FormikInput
              as="input"
              name="email"
              className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
              label="Email"
            />
            <Button
              type="submit"
              className="bg-appblue-900 w-full"
              disabled={!(isValid && dirty) || isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : userType === "user"
                  ? "Create Account as a User"
                  : "Create Account as a Tenant"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
