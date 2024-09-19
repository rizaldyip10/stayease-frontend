import React from "react";
import { Field, ErrorMessage, useFormikContext, FormikValues } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "./ImageUpload";
import { Button } from "@/components/ui/button";

interface RoomFormProps {
  index: number;
  onImageUpload: (
    file: File,
    fieldName: string,
    setFieldValue: (field: string, value: any) => void,
  ) => Promise<void>;
  onRemove: () => void;
}

const RoomForm: React.FC<RoomFormProps> = ({
  index,
  onImageUpload,
  onRemove,
}) => {
  const { values, errors, touched, setFieldValue } =
    useFormikContext<FormikValues>();

  const roomFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "basePrice", label: "Base Price", type: "number" },
    { name: "capacity", label: "Capacity", type: "number" },
  ];

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Room {index + 1}</h2>
      <div className="grid grid-cols-2 gap-4">
        {roomFields.map((field) => (
          <div key={field.name}>
            <Label htmlFor={`rooms.${index}.${field.name}`}>
              {field.label}
            </Label>
            <Field
              name={`rooms.${index}.${field.name}`}
              as={Input}
              type={field.type}
            />
            <ErrorMessage
              name={`rooms.${index}.${field.name}`}
              component="div"
              className="text-red-500"
            />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Label>Room Image</Label>
        <ImageUpload
          name={`rooms.${index}.imageUrl`}
          onImageUpload={onImageUpload}
        />
        {index > 0 && (
          <div className="grid md:grid-cols-7">
            <Button
              type="button"
              onClick={onRemove}
              className="mt-2 md:col-span-1"
            >
              Remove Room
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomForm;
