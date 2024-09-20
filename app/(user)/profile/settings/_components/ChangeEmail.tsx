"use client";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import FormikInput from "@/components/FormikInput";
import { useChangeEmail } from "@/hooks/useChangeEmail";

const validationSchema = Yup.object().shape({
  newEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ChangeEmail: React.FC = () => {
  const { initiateChangeEmail, isLoading, error } = useChangeEmail();

  const handleSubmit = async (
    values: { newEmail: string },
    { setSubmitting }: any,
  ) => {
    await initiateChangeEmail(values.newEmail);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ newEmail: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <FormikInput
            name="newEmail"
            type="email"
            label="New Email Address"
            placeholder="Enter your new email"
            className="w-full p-2 border rounded"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="bg-blue-950 text-white hover:bg-blue-900"
          >
            {isLoading ? "Sending..." : "Change Email"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ChangeEmail;
