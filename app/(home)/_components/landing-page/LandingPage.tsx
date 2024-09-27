"use client";
import React from "react";
import HeroSection from "@/app/(home)/_components/hero-section/HeroSection";
import MiniHero from "@/app/(home)/_components/landing-page/MiniHero";
import LandingPageListings from "@/app/(home)/_components/landing-page/LandingPageListings";
import Testimonials from "@/app/(home)/_components/landing-page/Testimonials";
import ReservationSteps from "@/app/(home)/_components/landing-page/ReservationSteps";
import { usePropertyListings } from "@/hooks/properties/usePropertyListings";
import LandingPageSkeleton from "@/app/(home)/_components/landing-page/LandingPageSkeleton";

const LandingPage = () => {
  const { isLoading } = usePropertyListings();

  if (isLoading) {
    return <LandingPageSkeleton />;
  }

  return (
    <>
      <HeroSection className="flex flex-col items-center justify-between md:p-6 md:min-h-[695px] md:max-h-[695px] max-h-screen" />
      <MiniHero />
      <LandingPageListings />
      <Testimonials />
      <ReservationSteps />
    </>
  );
};

export default LandingPage;
