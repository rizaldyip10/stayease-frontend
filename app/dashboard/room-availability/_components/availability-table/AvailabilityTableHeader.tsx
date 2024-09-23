import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

interface AvailabilityTableHeaderProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AvailabilityTableHeader: React.FC<AvailabilityTableHeaderProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="w-full flex justify-end">
      <Input
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="max-w-sm"
      />
    </div>
  );
};

export default AvailabilityTableHeader;
