import React, { useCallback, useState } from "react";
import { usePropertyUtils } from "@/hooks/properties/usePropertyUtils";
import {
  FilterOptions,
  usePropertyListings,
} from "@/hooks/properties/usePropertyListings";
import SearchFilterCard from "@/app/(home)/properties/_components/SearchFilterCard";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import SortSelect from "@/app/(home)/properties/_components/SortSelect";
import PropertyListingSkeleton from "@/components/PropertyListingSkeleton";
import PropertyListingCard from "@/components/PropertyListingCard";
import CustomPagination from "@/app/(home)/properties/_components/CustomPagination";
import NoResultsFound from "@/components/NoResultsFound";
import MapComponent from "@/components/MapComponent";

const PropertyListings: React.FC = () => {
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
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  const handleLocationChange = useCallback((lat: number, lng: number) => {
    setMapCenter({ lat, lng });
  }, []);

  const handleFilterChange = useCallback(
    (newFilters: Partial<FilterOptions>) => {
      updateFilters(newFilters);
    },
    [updateFilters],
  );

  const handleResetFilters = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

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
            <div className="w-full h-64">
              <MapComponent
                initialCenter={mapCenter}
                onLocationChange={handleLocationChange}
                isEditable={true}
                viewOnly={true}
                properties={properties}
              />
            </div>
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
                    currentFilters={filters}
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

export default PropertyListings;
