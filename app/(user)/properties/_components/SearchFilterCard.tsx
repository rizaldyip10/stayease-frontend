"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import CustomCheckbox from "@/app/(user)/properties/_components/CustomCheckbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomDatePicker } from "@/components/ui/date-picker";
import CustomSelect from "@/app/(user)/properties/_components/CustomSelect";
import FormikDatePicker from "@/components/DatePicker";
import DatePicker from "@/components/DatePicker";
import { usePropertyUtils } from "@/hooks/usePropertyUtils";
import Combobox from "@/components/Combobox";

const SearchFilterCard: React.FC = () => {
  const [selectedValue, setSelectedValue] = React.useState<string>("");

  // !! TODO: dummy datas, replace with actual data from API
  // TODO : replace cities with dropdown instead?
  const { cities, categories, isLoading, error } = usePropertyUtils();

  const cityChoices = cities.map((city) => ({
    value: city,
    label: city,
  }));

  const categoryChoices = categories.map((category) => ({
    value: category.name,
    label: category.name[0].toUpperCase() + category.name.slice(1),
  }));

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    console.log("selectedValue: ", value);
  };

  return (
    <div>
      <Card className="mb-4">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-950">Filters</h2>

          <div className="mb-4">
            <h3 className="font-semibold mb-2 text-blue-950">Location</h3>
            <div className="space-y-2">
              {/*// TODO : call locations from API*/}
              {/*{cities.map((city) => (*/}
              {/*  <CustomCheckbox key={city} label={city} />*/}
              {/*))}*/}
              <Combobox choices={cityChoices} onSelect={handleSelect} />
            </div>
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <h3 className="font-semibold mb-2 text-blue-950">Budget</h3>
            <Slider defaultValue={[0]} max={5000000} step={10000} />
            <div className="flex justify-between mt-2">
              <Input placeholder="Min" className="w-20" />
              <Input placeholder="Max" className="w-20" />
            </div>
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <h3 className="font-semibold mb-2 text-blue-950">Dates</h3>
            <CustomDatePicker title="From" />
            <CustomDatePicker title="To" />
            {/*<DatePicker*/}
            {/*  name="checkInDate"*/}
            {/*  label="Check-in"*/}
            {/*  value={checkInDate}*/}
            {/*  onChange={setBookingInfo}*/}
            {/*  isEditing={edit}*/}
            {/*/>*/}
            {/*-*/}
            {/*<DatePicker*/}
            {/*  name="checkOutDate"*/}
            {/*  label="Check-in"*/}
            {/*  value={checkOutDate}*/}
            {/*  onChange={setBookingInfo}*/}
            {/*  isEditing={edit}*/}
            {/*/>*/}
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2 text-blue-950">Category</h3>
            {/*// TODO: Call categories from API*/}
            {/*<CustomSelect category={categories} />*/}

            <Combobox choices={categoryChoices} onSelect={handleSelect} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchFilterCard;
