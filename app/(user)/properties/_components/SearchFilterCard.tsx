import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/app/(user)/properties/_components/CustomSelect";
import { CategoryType } from "@/constants/Property";
import { useDebounce } from "use-debounce";
import BudgetInput from "@/app/(user)/properties/_components/BudgetInput";
import { CustomDatePicker } from "@/app/(user)/properties/_components/CustomDatePicker";

interface SearchFilterCardProps {
  cities: string[] | undefined;
  categories: CategoryType[] | undefined;
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  city: string;
  minPrice: number;
  maxPrice: number;
  startDate: Date | null;
  endDate: Date | null;
  category: string;
  searchTerm: string;
}

const SearchFilterCard: React.FC<SearchFilterCardProps> = ({
  cities,
  categories,
  onFilterChange,
}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    city: "",
    minPrice: 0,
    maxPrice: 0,
    startDate: null,
    endDate: null,
    category: "",
    searchTerm: "",
  });

  const [debouncedFilters] = useDebounce(filters, 1000);

  useEffect(() => {
    console.log("Filters changed:", debouncedFilters);
    onFilterChange(debouncedFilters);
  }, [debouncedFilters, onFilterChange]);

  const handleInputChange = useCallback(
    (field: keyof FilterOptions, value: any) => {
      setFilters((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleBudgetChange = useCallback(
    (minPrice: number, maxPrice: number) => {
      setFilters((prev) => ({ ...prev, minPrice, maxPrice }));
    },
    [],
  );

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-blue-950">Filters</h2>

        <div className="mb-4">
          <Input
            placeholder="Search properties..."
            value={filters.searchTerm}
            onChange={(e) => handleInputChange("searchTerm", e.target.value)}
            className="mb-2"
          />
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-blue-950">Location</h3>
          <CustomSelect
            category={cities}
            value={filters.city}
            onChange={(value) => handleInputChange("city", value)}
          />
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-blue-950">Budget</h3>
          <BudgetInput
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onChange={handleBudgetChange}
          />
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-blue-950">Dates</h3>
          <CustomDatePicker
            title="From"
            date={filters.startDate}
            onDateChange={(date) => handleInputChange("startDate", date)}
          />
          <CustomDatePicker
            title="To"
            date={filters.endDate}
            onDateChange={(date) => handleInputChange("endDate", date)}
          />
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-blue-950">Category</h3>
          <CustomSelect
            category={categories?.map(
              (cat) => cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
            )}
            value={filters.category}
            onChange={(value) => handleInputChange("category", value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilterCard;
