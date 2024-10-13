import React from "react";
import { Field } from "formik";
import { useAlert } from "@/context/AlertContext";

interface FormFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  disabled: boolean;
  values: { [key: string]: any };
  isEditing: boolean;
}

const ProfileFormField: React.FC<FormFieldProps> = ({
  label,
  type,
  id,
  name,
  disabled,
  values,
  isEditing,
}) => {
  const { showAlert } = useAlert();
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEditing) {
      e.preventDefault();
      showAlert(
        "info",
        "Please go to settings page to request for email change.",
      );
    }
  };

  const isEmailField = type === "email";

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2">
        {label}:
      </label>
      {isEmailField ? (
        <div
          onClick={handleClick}
          className="w-full p-2 border rounded bg-gray-100 cursor-pointer"
        >
          {values[name]}
        </div>
      ) : (
        <Field
          type={type}
          id={id}
          name={name}
          disabled={disabled}
          className="w-full p-2 border rounded"
        />
      )}
    </div>
  );
};

export default ProfileFormField;
