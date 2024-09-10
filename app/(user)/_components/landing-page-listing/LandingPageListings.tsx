import React from "react";
import LandingPageCard from "@/components/prop-card/LandingPageCard";

interface LandingPageListingsProps {
  className?: string;
}

const LandingPageListings: React.FC<LandingPageListingsProps> = ({
  className,
}) => {
  return (
    <div>
      Landing Page Listings
      <LandingPageCard
        imageUrl="/404-home.webp"
        name="Demo"
        address="demo"
        price={123}
      />
    </div>
  );
};

export default LandingPageListings;
