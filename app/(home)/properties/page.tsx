"use client";
import React from "react";
import PropertyListings from "./_components/PropertyListings";
import PageWrapper from "@/components/PageWrapper";

const PropertiesPage: React.FC = () => {
  return (
    <PageWrapper>
      <PropertyListings />
    </PageWrapper>
  );
};

export default PropertiesPage;
