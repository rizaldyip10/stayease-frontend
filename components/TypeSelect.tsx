import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ErrorMessage, useField } from "formik";

interface TypeSelectProps {
  name: string;
  placeholder: string;
  label: string;
  options: { value: string; label: string }[];
}

const TypeSelect: React.FC<TypeSelectProps> = ({
  name,
  placeholder,
  label = "",
  options,
}) => {
  const [field, meta, helpers] = useField({ name });
  const lowerCaseLabel = label.toLowerCase();

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Select
        onValueChange={(value) => helpers.setValue(value)}
        value={field.value || ""}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectContent>
            {options?.map((option) => {
              console.log(option.label); // Debugging line
              return (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </SelectContent>
      </Select>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default TypeSelect;
