"use client";
import React, { useMemo } from "react";
import PropertyDetails from "@/app/(user)/properties/[propertyId]/_components/PropertyDetails";
import { usePropertyDetails } from "@/hooks/properties/usePropertyDetails";
import { notFound, useSearchParams } from "next/navigation";

export default function PropertyDetailsPage({
  params,
}: {
  params: { propertyId: string };
}) {
  const searchParams = useSearchParams();

  const checkInDate = searchParams.get("checkInDate");
  const date = checkInDate ? new Date(checkInDate) : new Date();
  const timezone = date.getTimezoneOffset();
  console.log("timezone", timezone);

  const propertyId = parseInt(params.propertyId, 10);

  const { currentProperty, error, isLoading } = usePropertyDetails(
    propertyId,
    date,
  );

  if (isLoading) {
    return <div>Loading property details...</div>;
  }
  if (error) {
    return <div>Error loading property details: {error.message}</div>;
  }
  if (!currentProperty) {
    return notFound();
  }

  return <PropertyDetails property={currentProperty} propertyId={propertyId} />;
}
