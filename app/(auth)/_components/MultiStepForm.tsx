"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { whiteSpaceRegex } from "@/constants/WhiteSpaceRegex";
import { UserType } from "@/constants/Types";
import { Form, Formik, FormikHelpers } from "formik";
import FormikInput from "@/components/FormikInput";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export interface MultiStepFormValues {
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  businessName: string;
  taxId: string;
}

interface MultiStepFormProps {
  userType: UserType;
  onSubmit: (
    values: MultiStepFormValues,
    token: string,
    actions: FormikHelpers<MultiStepFormValues>,
  ) => void;
  token: string;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  userType,
  onSubmit,
  token,
}) => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const validationSchema = [
    yup.object().shape({
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters long")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character",
        )
        .matches(whiteSpaceRegex, "Please enter a valid password")
        .required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Password confirmation is required"),
    }),
    yup.object({
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      phoneNumber: yup.string(),
    }),
    userType === "tenant"
      ? yup.object({
          businessName: yup.string().required("Required"),
          taxId: yup.string(),
        })
      : yup.object({}),
  ];

  const initialValues = {
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    businessName: "",
    taxId: "",
  };

  const handleSubmit = async (
    values: MultiStepFormValues,
    actions: FormikHelpers<MultiStepFormValues>,
  ) => {
    if (step < (userType === "tenant" ? 4 : 3)) {
      setStep(step + 1);
      console.log("values: ", values);
      actions.setSubmitting(false);
    } else {
      await onSubmit(values, token, actions);
      console.log("values: {}, token: {}", values, token);
      // TODO : implement loading screen and show result
      setTimeout(() => {
        router.push("/");
      }, 5000);
    }
  };

  const renderStep = (values: MultiStepFormValues) => {
    switch (step) {
      case 1:
        return (
          <>
            <FormikInput
              as="input"
              name="password"
              className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
              label="Password"
              type="password"
            />
            <FormikInput
              as="input"
              name="confirmPassword"
              className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
              label="Confirm Password"
              type="password"
            />
          </>
        );
      case 2:
        return (
          <>
            <FormikInput
              as="input"
              name="firstName"
              className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
              label="First Name"
            />
            <FormikInput
              as="input"
              name="lastName"
              className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
              label="Last Name"
            />
            <FormikInput
              as="input"
              name="phoneNumber"
              className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
              label="Phone Number (optional)"
            />
          </>
        );
      case 3:
        if (userType === "tenant") {
          return (
            <>
              <FormikInput
                as="input"
                name="businessName"
                className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
                label="Business Name"
              />
              <FormikInput
                as="input"
                name="taxId"
                className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
                label="Tax ID (optional)"
              />
            </>
          );
        }
      // If not tenant, fall through to summary page
      case 4:
        return (
          <div className="max-w-full space-y-4">
            <h2 className="text-xl font-bold">Summary</h2>
            <p>
              <strong>First Name:</strong> {values.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {values.lastName}
            </p>
            <p>
              <strong>Phone Number:</strong>{" "}
              {values.phoneNumber || "Not provided"}
            </p>
            {userType === "tenant" && (
              <>
                <p>
                  <strong>Business Name:</strong>{" "}
                  {values.businessName || "Not provided"}
                </p>
                <p>
                  <strong>Tax ID:</strong> {values.taxId || "Not provided"}
                </p>
              </>
            )}
            <p className="text-sm text-gray-500 text-center">
              Please review your information. If everything is correct, click
              &apos;Submit&apos; to complete your registration.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema[step - 1]}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty, isSubmitting, values }) => (
        <Form className="space-y-7 min-w-lg">
          <div className="flex justify-center gap-7 mb-4">
            {[1, 2, 3, 4]
              .slice(0, userType === "tenant" ? 4 : 3)
              .map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === stepNumber
                      ? "bg-appblue-900 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {stepNumber}
                </div>
              ))}
          </div>
          <div className="w-full flex flex-col gap-4">{renderStep(values)}</div>
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button
                type="button"
                onClick={() => setStep(step - 1)}
                variant="outline"
                className="bg-appblue-900 w-1/2 text-white text-center"
                disabled={!(isValid && dirty) || isSubmitting}
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              className="bg-appblue-900 w-1/2 text-white mx-auto"
              disabled={!(isValid && dirty) || isSubmitting}
            >
              {step === (userType === "tenant" ? 4 : 3) ? "Submit" : "Next"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MultiStepForm;
