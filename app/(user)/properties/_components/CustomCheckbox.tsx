import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface CustomCheckboxProps {
  label: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label }) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
