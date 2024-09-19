"use client";
import React from "react";
import { usePropertyListings } from "@/hooks/properties/usePropertyListings";
import PropertyListingSkeleton from "@/app/(home)/properties/_components/PropertyListingSkeleton";
import PropertyListingCard from "@/app/(home)/properties/_components/PropertyListingCard";
import NoResultsFound from "@/app/(home)/properties/_components/NoResultsFound";

const LandingPageListings = () => {
  const { properties, isLoading } = usePropertyListings();

  const hasResults = properties && properties.length > 0;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Reserve The Finest Rooms</h1>
      {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-6">*/}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <PropertyListingSkeleton key={index} />
            ))}
        </div>
      ) : hasResults ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {properties
              .sort(() => 0.5 - Math.random())
              .slice(0, 6)
              .map((property) => (
                <PropertyListingCard
                  key={property.propertyId}
                  property={property}
                />
              ))}
          </div>
        </>
      ) : (
        <NoResultsFound />
      )}
    </div>
    // </div>
  );
};

export default LandingPageListings;

// API Integration:
// 1. Fetch property data from your API (e.g., GET /api/properties?limit=6)
// 2. Replace the hardcoded map with the fetched data
// 3. Use actual property data for name, address, price, etc.
