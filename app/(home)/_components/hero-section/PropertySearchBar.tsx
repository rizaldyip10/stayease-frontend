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
  const { cities, categories, isLoading, error } = usePropertyUtils();
  const isDesktop: boolean = useMediaQuery("(min-width: 768px)");
  const { handleSearch } = usePropertySearch();
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch({
      city: selectedCity,
      maxPrice: budget ? parseInt(budget, 10) : undefined,
      startDate: date,
    });
  };

  const choices: { value: string; label: string }[] =
    cities?.map((city) => ({
      value: city,
      label: city,
    })) || [];

  return (
    <form onSubmit={onSubmit}>
      <div className={`property-search-bar ${className}`}>
        <h2 className="text-xl font-semibold mb-4">
          Search for available rooms
        </h2>
        <div className="flex md:flex-row flex-col gap-4 md:w-full m-0">
          {isDesktop ? (
            <>
              <div style={{ flex: "2 1 0%" }}>
                <Combobox choices={choices} onSelect={setSelectedCity} />
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
              <div style={{ flex: "1 1 0%" }}>
                <Button
                  type="submit"
                  className="bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Search
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <Combobox choices={choices} onSelect={setSelectedCity} />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Budget"
                  className="p-2 border rounded-lg"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
              <div>
                <CustomDatePicker
                  title="Pick a date"
                  date={date}
                  onDateChange={setDate}
                  minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Search
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default PropertySearchBar;
