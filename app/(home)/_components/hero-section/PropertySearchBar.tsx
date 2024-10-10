"use client";
import React, { useState } from "react";
import Combobox from "@/components/Combobox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePropertyUtils } from "@/hooks/properties/usePropertyUtils";
import useMediaQuery from "@/hooks/utils/useMediaQuery";
import { usePropertySearch } from "@/hooks/properties/usePropertySearch";
import { CustomDatePicker } from "@/components/CustomDatePicker";

interface HeroSearchBarProps {
  className?: string;
}

const PropertySearchBar: React.FC<HeroSearchBarProps> = ({ className }) => {
  const { cities, isLoading, error } = usePropertyUtils();
  const { handleRedirect } = usePropertySearch();
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [guestCount, setGuestCount] = useState<string>(""); // New state for guest count

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRedirect(
      {
        city: selectedCity,
        maxPrice: budget ? parseInt(budget, 10) : undefined,
        startDate: date,
        guestCount: guestCount ? parseInt(guestCount, 10) : undefined, // Include guest count in search params
      },
      "/properties",
    );
  };

  const choices: { value: string; label: string }[] =
    cities?.map((city) => ({
      value: city,
      label: city,
    })) || [];

  const renderSearchInputs = () => (
    <>
      <div style={{ flex: "2 1 0%" }}>
        <Combobox
          placeholder="Select your destination..."
          choices={choices}
          onSelect={setSelectedCity}
        />
      </div>
      <div style={{ flex: "2 1 0%" }}>
        <Input
          type="number"
          placeholder="Budget"
          className="p-2 border rounded-lg"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>
      <div style={{ flex: "2 1 0%" }}>
        <CustomDatePicker
          title="Pick a date"
          date={date}
          onDateChange={setDate}
          minDate={new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </div>
      <div style={{ flex: "2 1 0%" }}>
        <Input
          type="number"
          placeholder="Number of guests"
          className="p-2 border rounded-lg"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
          min="1"
        />
      </div>
      <div style={{ flex: "1 1 0%" }}>
        <Button
          type="submit"
          className="bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Search
        </Button>
      </div>
    </>
  );

  return (
    <form onSubmit={onSubmit}>
      <div className={`property-search-bar ${className}`}>
        <h2 className="text-xl font-semibold mb-4">
          Search for available rooms
        </h2>
        <div className="flex md:flex-row flex-col gap-4 md:w-full m-0">
          {renderSearchInputs()}
        </div>
      </div>
    </form>
  );
};

export default PropertySearchBar;
