import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/components/CustomSelect";
import { CategoryType } from "@/constants/Property";
import BudgetInput from "@/app/(home)/properties/_components/BudgetInput";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import { FilterOptions } from "@/hooks/properties/usePropertyListings";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";

interface SearchFilterCardProps {
  cities: string[] | undefined;
  categories: CategoryType[] | undefined;
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
}

const SearchFilterCard: React.FC<SearchFilterCardProps> = ({
  cities,
  categories,
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);

  const handleInputChange = (field: keyof FilterOptions, value: any) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleStartDateChange = (date?: Date) => {
    handleInputChange("startDate", date);
    setCheckInOpen(false);
    setCheckOutOpen(true);
    if (filters.endDate && date && filters.endDate <= date) {
      handleInputChange("endDate", addDays(date, 1));
    }
  };

  const handleEndDateChange = (date?: Date) => {
    handleInputChange("endDate", date);
    setCheckOutOpen(false);
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-950">Filters</h2>
          <Button variant="link" onClick={onResetFilters}>
            Reset Filters
          </Button>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Search properties..."
            value={filters.searchTerm}
            onChange={(e) => handleInputChange("searchTerm", e.target.value)}
            className="mb-2"
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-blue-950">Location</h3>
          <CustomSelect
            title="Select City"
            options={cities?.map((city) => ({ value: city, label: city }))}
            value={filters.city}
            onChange={(value) => handleInputChange("city", value)}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-blue-950">Budget</h3>
          <BudgetInput
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onChange={(minPrice, maxPrice) =>
              onFilterChange({ minPrice, maxPrice })
            }
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-blue-950">Dates</h3>
          <div className="space-y-2">
            <CustomDatePicker
              title="Check-in"
              date={filters.startDate}
              onDateChange={handleStartDateChange}
              minDate={today}
              open={checkInOpen}
              setOpen={setCheckInOpen}
            />
            <CustomDatePicker
              title="Check-out"
              date={filters.endDate}
              onDateChange={handleEndDateChange}
              minDate={
                filters.startDate
                  ? addDays(filters.startDate, 1)
                  : addDays(today, 1)
              }
              open={checkOutOpen}
              setOpen={setCheckOutOpen}
            />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-blue-950">Category</h3>
          <CustomSelect
            title="Select Category"
            options={categories?.map((cat) => ({
              value: cat.id.toString(),
              label: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
            }))}
            value={filters.categoryId}
            onChange={(value) => handleInputChange("categoryId", value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilterCard;
