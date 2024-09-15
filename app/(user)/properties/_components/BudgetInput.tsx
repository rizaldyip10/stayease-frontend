import React from "react";
import { Input } from "@/components/ui/input";

interface BudgetInputProps {
  minPrice: number;
  maxPrice: number;
  onChange: (minPrice: number, maxPrice: number) => void;
}

const BudgetInput: React.FC<BudgetInputProps> = ({
  minPrice,
  maxPrice,
  onChange,
}) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    onChange(value, Math.max(value, maxPrice));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onChange(Math.min(minPrice, value), value);
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        placeholder="Min Price"
        value={minPrice || ""}
        onChange={handleMinChange}
        className="w-full"
      />
      <span className="text-gray-500">to</span>
      <Input
        type="number"
        placeholder="Max Price"
        value={maxPrice || ""}
        onChange={handleMaxChange}
        className="w-full"
      />
    </div>
  );
};

export default BudgetInput;
