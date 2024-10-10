"use client";
import React, { useEffect } from "react";
import LandingPage from "@/app/(home)/_components/landing-page/LandingPage";
import PageWrapper from "@/components/PageWrapper";

export default function Home() {
  // ! only for logging, delete when done
  useEffect(() => {
    console.log("Environment Variables:");
    console.log("NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);
    console.log(
      "NEXT_PUBLIC_BACKEND_URL:",
      process.env.NEXT_PUBLIC_BACKEND_URL,
    );
    console.log(
      "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:",
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    );
    console.log(
      "NEXT_PUBLIC_GOOGLE_MAPS_ID:",
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
    );
  }, []);

  return (
    <main>
      <PageWrapper className="">
        <LandingPage />
      </PageWrapper>
    </main>
  );
}
