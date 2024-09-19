"use client";
import React from "react";
import HeroDescription from "@/app/(user)/_components/hero-section/HeroDescription";
import PropertySearchBar from "@/components/PropertySearchBar";
import { CarouselPlugin } from "@/components/CarouselPlugin";
import useMediaQuery from "@/hooks/utils/useMediaQuery";
import { useSession } from "next-auth/react";

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const isDesktop: boolean = useMediaQuery("(min-width: 768px)");
  const { data: session } = useSession();
  console.log("Home", { session });

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
      <div className="flex flex-row md:mb-0 mb-4 items-center justify-between overflow-hidden">
        {isDesktop ? (
          <>
            <div className="left-hero w-1/2 md:grid grid-rows-[1fr_7fr_3fr]">
              <div></div>
              <HeroDescription className="md:min-h-[390px]" />
              <div></div>
            </div>
            <div className="right-hero md:w-1/2">
              <CarouselPlugin images={images} />
            </div>
          </>
        ) : (
          <div className="left-hero relative min-h-full h-full">
            <div className="absolute inset-0 opacity-40 md:opacity-100 min-h-full h-full">
              <CarouselPlugin images={images} className="h-full rounded-2xl" />
            </div>
            <div className="relative z-10 p-5 flex items-center">
              <HeroDescription className="min-h-full bg-slate-50 bg-opacity-20 p-2" />
            </div>
          </div>
        )}
      </div>
      <div className="w-full">
        <PropertySearchBar
          className="md:absolute md:w-3/4 md:z-20 md:left-1/2 md:top-[80%] md:transform md:-translate-x-1/2 md:-translate-y-1/2
        outline-2 outline-slate-300 border p-4 rounded-lg bg-[#FAFAFA]"
        />
      </div>
    </div>
  );
};

export default HeroSection;
