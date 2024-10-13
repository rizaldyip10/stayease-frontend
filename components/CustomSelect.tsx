import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  title: string;
  options: SelectOption[] | undefined;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  title,
  options,
  value,
  onChange,
  disabled,
}) => {
  const isLoading = !options;
  const error = !isLoading && !options?.length;

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>No options found</div>
        ) : (
          options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
