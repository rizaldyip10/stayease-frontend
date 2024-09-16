"use client";
import React, { useState } from "react";
import Combobox from "@/components/Combobox";
import { Input } from "@/components/ui/input";
import { CustomDatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import useMediaQuery from "@/hooks/useMediaQuery";

interface HeroSearchBarProps {
  className?: string;
}

const PropertySearchBar: React.FC<HeroSearchBarProps> = ({ className }) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const isDesktop: boolean = useMediaQuery("(min-width: 768px)");

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    console.log("selectedValue: ", value);
  };

  // !! TODO : just example data, replace when API is ready
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
      <div className="flex md:flex-row flex-col gap-4 md:w-full m-0">
        {isDesktop ? (
          <>
            <div style={{ flex: "2 1 0%" }}>
              <Combobox choices={choices} onSelect={handleSelect} />
            </div>
            <div style={{ flex: "2 1 0%" }}>
              <Input
                type="number"
                placeholder="Budget"
                className="p-2 border rounded-lg"
              />
            </div>
            <div style={{ flex: "2 1 0%" }}>
              <CustomDatePicker title="Pick a date" />
            </div>
            <div style={{ flex: "1 1 0%" }}>
              <Button
                type="submit"
                className="bg-appblue-900 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Search
              </Button>
            </div>
          </>
        ) : (
          <>
            <div>
              <Combobox choices={choices} onSelect={handleSelect} />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Budget"
                className="p-2 border rounded-lg"
              />
            </div>
            <div>
              <CustomDatePicker title="Pick a date" />
            </div>
            <div>
              <Button
                type="submit"
                className="bg-appblue-900 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Search
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertySearchBar;
