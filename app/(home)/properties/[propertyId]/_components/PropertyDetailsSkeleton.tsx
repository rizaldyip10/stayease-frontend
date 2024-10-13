import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonLoaderProps {
  type: "property" | "room";
}

const PropertyDetailsSkeleton: React.FC<SkeletonLoaderProps> = ({ type }) => {
  return (
    <div className="container mx-auto p-4">
      <Skeleton className="h-12 w-3/4 mb-6" /> {/* Title */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="w-full h-64 md:h-96 mb-6" /> {/* Main image */}
          <div className="mb-8">
            <div className="flex mb-4">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-10 w-24 mr-2" />
              ))}
            </div>
            <Skeleton className="h-20 w-full mb-4" /> {/* Description */}
            <Skeleton className="h-20 w-full" /> {/* More content */}
          </div>
          {type === "property" && (
            <>
              <Skeleton className="h-8 w-48 mb-4" /> {/* "Location" title */}
              <Skeleton className="w-full h-64 mb-4" /> {/* Map placeholder */}
              <Skeleton className="h-6 w-3/4" /> {/* Address */}
            </>
          )}
        </div>
        <div>
          <Skeleton className="w-full h-[400px]" /> {/* Booking card */}
        </div>
      </div>
      {type === "property" && (
        <div className="mt-8">
          <Skeleton className="h-8 w-48 mb-4" /> {/* "Available Rooms" title */}
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-full h-32 mb-4" />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsSkeleton;
