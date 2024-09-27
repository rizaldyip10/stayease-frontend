import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HeroSectionSkeleton: React.FC = () => {
  return (
    <div className="md:relative flex flex-col items-center justify-between md:p-6 md:min-h-[695px] md:max-h-[695px] max-h-screen">
      <div className="flex flex-row md:mb-0 mb-4 items-center justify-between overflow-hidden w-full">
        <div className="left-hero h-full w-full md:w-1/2 md:grid grid-rows-[1fr_7fr_3fr]">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-40 w-full mb-4" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="right-hero hidden md:block md:w-1/2">
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
      <div className="w-full mt-4 md:absolute md:w-3/4 md:z-20 md:left-1/2 md:top-[80%] md:transform md:-translate-x-1/2 md:-translate-y-1/2">
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
};

export default HeroSectionSkeleton;
