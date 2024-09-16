import React from "react";

interface HeroDescriptionProps {
  className?: string;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({ className }) => {
  return (
    <div className={`hero-desc ${className}`}>
      <div className="flex flex-col justify-center px-5">
        <div className="call-text text-4xl font-medium mb-4">
          <p className="text-appblue-900 md:mb-4 mb-2">Find Your Future</p>
          <p className="md:font-normal font-light">Dream Accommodation</p>
        </div>
        <div>
          <p className="text-lg text-gray-600 mb-6">
            Want to find an accommodation? We are ready to help you find one
            that suits your lifestyle and needs.
          </p>
        </div>
        <div className="flex md:flex-wrap flex-row justify-between md:mb-8">
          <div className="w-full sm:w-1/3 md:mb-4 sm:mb-0">
            <p className="md:text-3xl text-2xl font-bold text-appblue-900">
              4235+
            </p>
            <p className="text-gray-600">Rooms</p>
          </div>
          <div className="w-full sm:w-1/3 md:mb-4 sm:mb-0">
            <p className="md:text-3xl text-2xl font-bold text-appblue-900">
              420+
            </p>
            <p className="text-gray-600">Bookings</p>
          </div>
          <div className="w-full sm:w-1/3">
            <p className="md:text-3xl text-2xl font-bold text-appblue-900">
              1905+
            </p>
            <p className="text-gray-600">Users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDescription;
