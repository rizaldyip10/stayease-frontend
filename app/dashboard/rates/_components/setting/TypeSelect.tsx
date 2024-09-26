import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TypeSelectProps {
  onValueChange: (value: string) => void;
  value: string | undefined;
  placeholder?: string;
  items?: { value: string; label: string }[];
}

const TypeSelect: React.FC<TypeSelectProps> = ({
  onValueChange,
  value,
  items,
  placeholder,
}) => {
  console.log("TypeSelect: ", items);
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectContent>
          {items?.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectContent>
    </Select>
  );
};

export default TypeSelect;
