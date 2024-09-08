"use client";
import React from "react";
import HeroDescription from "@/app/(user)/_components/hero-section/HeroDescription";
import PropertySearchBar from "@/components/PropertySearchBar";
import { CarouselPlugin } from "@/components/CarouselPlugin";

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const images = [
    {
      src: "/sign-up-side-pic.webp",
      alt: "Hero Image 1",
    },
    {
      src: "/verify.webp",
      alt: "Hero Image 2",
    },
    {
      src: "/login-pic.webp",
      alt: "Hero Image 3",
    },
  ];

  return (
    <div className={`hero-section md:relative ${className}`}>
      <div className="flex flex-row items-center justify-between overflow-hidden">
        <div className="left-hero w-1/2 md:grid grid-rows-[1fr_7fr_3fr] hidden">
          <div></div>
          <HeroDescription className="md:min-h-[390px]" />
          <div></div>
        </div>
        <div className="w-1/2">
          <CarouselPlugin images={images} />
        </div>
      </div>
      <div>
        <PropertySearchBar
          className="md:absolute md:block hidden w-3/4 z-20 left-1/2 top-[80%] transform -translate-x-1/2 -translate-y-1/2
        outline-2 outline-slate-300 border p-4 rounded-lg space-x-4 bg-[#FAFAFA]"
        />
      </div>
    </div>
  );
};

export default HeroSection;
