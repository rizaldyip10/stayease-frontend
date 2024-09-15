// app/(user)/properties/page.tsx
"use client";
import React, { useState } from "react";
import SearchFilterCard from "./_components/SearchFilterCard";
import PropertyListingCard from "./_components/PropertyListingCard";
import SortSelect from "./_components/SortSelect";
import CustomPagination from "./_components/CustomPagination";
import { usePropertyListings } from "@/hooks/usePropertyListings";
import { usePropertyUtils } from "@/hooks/usePropertyUtils";
import PropertyListingSkeleton from "./_components/PropertyListingSkeleton";
import NoResultsFound from "./_components/NoResultsFound";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";

const PropertiesPage: React.FC = () => {
  const { categories, cities } = usePropertyUtils();
  const {
    properties,
    isLoading,
    error,
    filters,
    sort,
    pagination,
    updateFilters,
    updateSort,
    updatePage,
    resetFilters,
  } = usePropertyListings();

  const [showFilters, setShowFilters] = useState(false);

  if (error) return <div>Error: {error}</div>;

  const hasResults = properties && properties.length > 0;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div
          className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}
        >
          <SearchFilterCard
            cities={cities}
            categories={categories}
            filters={filters}
            onFilterChange={updateFilters}
            onResetFilters={resetFilters}
          />
        </div>

        <div className="lg:col-span-3">
          <div className="mb-4">
            <div id="map" className="w-full h-64 bg-gray-200"></div>
          </div>
          <div className="mb-4 flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <FilterIcon className="mr-2 h-4 w-4" /> Filters
            </Button>
            <SortSelect sort={sort} onSortChange={updateSort} />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array(pagination.size)
                .fill(0)
                .map((_, index) => (
                  <PropertyListingSkeleton key={index} />
                ))}
            </div>
          ) : hasResults ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {properties.map((property) => (
                  <PropertyListingCard
                    key={property.propertyId}
                    property={property}
                  />
                ))}
              </div>
              <CustomPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={updatePage}
              />
            </>
          ) : (
            <NoResultsFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
