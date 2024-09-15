import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = {
  sortBy: string;
  sortDirection: string;
};

interface SortSelectProps {
  onSortChange: (sort: SortOption) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ onSortChange }) => {
  const handleSortChange = (value: string) => {
    const [sortBy, sortDirection] = value.split("-");
    onSortChange({ sortBy, sortDirection });
  };

  return (
    <Select onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
        <SelectItem value="name-asc">Name: A to Z</SelectItem>
        <SelectItem value="name-desc">Name: Z to A</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortSelect;
