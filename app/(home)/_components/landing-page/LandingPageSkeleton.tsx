import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import HeroSectionSkeleton from "@/app/(home)/_components/hero-section/HeroSectionSkeleton";

const LandingPageSkeleton: React.FC = () => {
  return (
    <>
      <HeroSectionSkeleton />

      {/* Mini Hero Section */}
      <div className="container mx-auto p-4 my-8">
        <Skeleton className="h-40 w-full mb-4" />
      </div>

      {/* Property Listings */}
      <div className="container mx-auto p-4 my-8">
        <Skeleton className="h-10 w-1/3 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-80 w-full" />
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto p-4 my-8">
        <Skeleton className="h-10 w-1/3 mb-6" />
        <div className="flex flex-wrap justify-around">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-40 w-full md:w-1/4 mb-4" />
          ))}
        </div>
      </div>

      {/* Reservation Steps */}
      <div className="container mx-auto p-4 my-8">
        <Skeleton className="h-10 w-1/3 mb-6" />
        <div className="flex flex-wrap justify-around">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-20 w-full md:w-1/5 mb-4" />
          ))}
        </div>
      </div>
    </>
  );
};

export default LandingPageSkeleton;
