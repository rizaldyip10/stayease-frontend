import React from "react";
import FormikInput from "@/components/FormikInput";

interface FormInputsProps {
  formType: string;
}

const FormInputs: React.FC<FormInputsProps> = ({ formType }) => {
  switch (formType) {
    case "login":
      return (
        <>
          <FormikInput
            as="input"
            name="email"
            className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
            label="Email"
          />
          <FormikInput
            as="input"
            name="password"
            className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
            label="Password"
            type="password"
          />
        </>
      );
    case "register":
      return (
        <FormikInput
          as="input"
          name="email"
          className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
          label="Email"
        />
      );
    case "userType":
      return (
        <>
          <FormikInput
            name="businessName"
            label="Business Name"
            placeholder="Enter your business name"
            className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
          />
          <FormikInput
            name="taxId"
            label="Tax ID (optional)"
            placeholder="Enter your tax ID"
            className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
          />
        </>
      );
    default:
      return null;
  }
};

export default FormInputs;
