"use client";
import React, { useCallback, useEffect, useState } from "react";
import SearchFilterCard from "@/app/(home)/properties/_components/SearchFilterCard";
import PropertyListingCard from "@/app/(home)/properties/_components/PropertyListingCard";
import SortSelect from "@/app/(home)/properties/_components/SortSelect";
import CustomPagination from "@/app/(home)/properties/_components/CustomPagination";
import {
  FilterOptions,
  usePropertyListings,
} from "@/hooks/properties/usePropertyListings";
import { usePropertyUtils } from "@/hooks/properties/usePropertyUtils";
import PropertyListingSkeleton from "@/app/(home)/properties/_components/PropertyListingSkeleton";
import NoResultsFound from "@/app/(home)/properties/_components/NoResultsFound";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { useBookingValues } from "@/hooks/useBookingValues";
import { format } from "date-fns";

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

  const { bookingValues, setBookingInfo } = useBookingValues();

  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = useCallback(
    (newFilters: Partial<FilterOptions>) => {
      updateFilters(newFilters);

      if (newFilters.startDate) {
        setBookingInfo({
          checkInDate: format(newFilters.startDate, "yyyy-MM-dd"),
        });
      }
      if (newFilters.endDate) {
        setBookingInfo({
          checkOutDate: format(newFilters.endDate, "yyyy-MM-dd"),
        });
      }
    },
    [updateFilters, setBookingInfo],
  );

  const handleResetFilters = useCallback(() => {
    resetFilters();
    setBookingInfo({ checkInDate: null, checkOutDate: null });
  }, [resetFilters, setBookingInfo]);

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
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
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
