"use client";
import React, { useState } from "react";
import SearchFilterCard, {
  FilterOptions,
} from "@/app/(user)/properties/_components/SearchFilterCard";
import PropertyListingCard from "@/app/(user)/properties/_components/PropertyListingCard";
import { PropertyAndRoomType } from "@/constants/Property";
import { usePropertyUtils } from "@/hooks/usePropertyUtils";
import SortSelect, {
  SortOption,
} from "@/app/(user)/properties/_components/SortSelect";
import CustomPagination from "@/app/(user)/properties/_components/CustomPagination";

interface PaginationInfo {
  totalPages: number;
  currentPage: number;
  totalElements: number;
}

const PropertiesPage: React.FC = () => {
  const { properties, categories, cities, isLoading, error } =
    usePropertyUtils();
  const [sortParams, setSortParams] = useState<SortOption>({
    sortBy: "",
    sortDirection: "",
  });
  const [filterParams, setFilterParams] = useState<FilterOptions>({
    city: "",
    minPrice: 0,
    maxPrice: 5000000,
    startDate: null,
    endDate: null,
    category: "",
    searchTerm: "",
  });
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    totalPages: 1,
    currentPage: 0,
    totalElements: 0,
  });

  const handleSortChange = (sort: SortOption) => {
    setSortParams(sort);
    console.log(sort);
    // fetchProperties(0, sort, filterParams);
  };

  const handleFilterChange = (filters: FilterOptions) => {
    setFilterParams(filters);
    console.log(filters);
    // fetchProperties(0, sortParams, filters);
  };

  const handlePageChange = (page: number) => {
    console.log(page);
    // fetchProperties(page, sortParams, filterParams);
  };

  // const fetchProperties = async (
  //   page: number,
  //   sort: SortOption,
  //   filters: FilterOptions,
  // ) => {
  //   try {
  //     const response = await sortAndFilter(
  //       filters.startDate,
  //       filters.endDate,
  //       filters.city,
  //       categories?.find((cat) => cat.name === filters.category)?.id,
  //       page,
  //       10, // size
  //       sort.sortBy,
  //       sort.sortDirection,
  //       filters.searchTerm,
  //     );
  //
  //     // Assuming the response structure matches what you provided
  //     setPaginationInfo({
  //       totalPages: response.totalPages,
  //       currentPage: response.currentPage,
  //       totalElements: response.totalElements,
  //     });
  //
  //     // Update properties state (this should be handled in your usePropertyUtils hook)
  //   } catch (error) {
  //     console.error("Error fetching properties:", error);
  //   }
  // };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <SearchFilterCard
            cities={cities}
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="md:col-span-3">
          <div className="mb-4">
            <div id="map" className="w-full h-64 bg-gray-200"></div>
          </div>

          <div className="flex justify-end mb-4">
            <SortSelect onSortChange={handleSortChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.isArray(properties) ? (
              properties.map((property: PropertyAndRoomType) => (
                <PropertyListingCard key={property.id} property={property} />
              ))
            ) : (
              <p>No properties found</p>
            )}
          </div>

          <CustomPagination
            currentPage={paginationInfo.currentPage}
            totalPages={paginationInfo.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
