"use client";
import React, { useState } from "react";
import Combobox from "@/components/Combobox";
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";

interface HeroSearchBarProps {
  className?: string;
}

const PropertySearchBar: React.FC<HeroSearchBarProps> = ({ className }) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    console.log("selectedValue: ", value);
  };

  const choices = [
    {
      value: "jakarta",
      label: "Jakarta",
    },
    {
      value: "bali",
      label: "Bali",
    },
  ];

  return (
    <div className={`property-search-bar ${className}`}>
      <h2 className="text-xl font-semibold mb-4">Search for available rooms</h2>
      <div className="grid grid-cols-[2fr_2fr_2fr_1fr] gap-4 sm:grid-cols-1">
        <Combobox choices={choices} onSelect={handleSelect} />
        <Input
          type="number"
          placeholder="Budget"
          className="p-2 border rounded-lg"
        />
        <DatePickerDemo />
        <Button
          type="submit"
          className="bg-appblue-900 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default PropertySearchBar;
