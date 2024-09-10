import React from "react";
import { Field } from "formik";

interface FormFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  disabled: boolean;
  values: { [key: string]: any };
  onClick?: () => void;
}

const ProfileFormField: React.FC<FormFieldProps> = ({
  label,
  type,
  id,
  name,
  disabled,
  onClick,
  values,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2">
        {label}:
      </label>
      <Field
        type={type}
        id={id}
        name={name}
        disabled={disabled}
        className="w-full p-2 border rounded"
        onClick={onClick}
      />
    </div>
  );
};

export default ProfileFormField;
