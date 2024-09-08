import React from "react";
import PropertySearchBar from "@/components/PropertySearchBar";

interface HeroDescriptionProps {
  className?: string;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({ className }) => {
  return (
    <div className={`hero-desc ${className}`}>
      <div className="flex flex-col justify-center px-5">
        <div className="call-text text-4xl font-medium mb-4">
          <p className="text-appblue-900 mb-4">Find Your Future</p>
          <p className="">Dream Accommodation</p>
        </div>
        <div>
          <p className="text-lg text-gray-600 mb-6">
            Want to find an accommodation? We are ready to help you find one
            that suits your lifestyle and needs.
          </p>
        </div>
        <div className="flex flex-wrap justify-between mb-8">
          <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
            <p className="text-3xl font-bold text-blue-700">4235+</p>
            <p className="text-gray-600">Rooms</p>
          </div>
          <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
            <p className="text-3xl font-bold text-blue-700">420+</p>
            <p className="text-gray-600">Reservations</p>
          </div>
          <div className="w-full sm:w-1/3">
            <p className="text-3xl font-bold text-blue-700">1905+</p>
            <p className="text-gray-600">Users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDescription;
