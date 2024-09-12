import HeroSection from "@/app/(user)/_components/hero-section/HeroSection";
import React from "react";
import LandingPageListings from "@/app/(user)/_components/landing-page-listing/LandingPageListings";
import LandingPage from "@/app/(user)/_components/landing-page-listing/LandingPage";
import SearchFilterPage from "@/app/(user)/properties/_components/SearchFilterCard";
import PropertyDetailsPage from "@/app/(user)/_components/landing-page-listing/PropertyDetailsPage";

export default function Home() {
  return (
    <main className="">
      <HeroSection className="flex flex-col items-center justify-between md:p-6 md:min-h-[695px] md:max-h-[695px] max-h-screen" />
      <PropertyDetailsPage />
    </main>
  );
}
