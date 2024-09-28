"use client";
import React from "react";
import PropertyDetails from "@/app/(home)/properties/[propertyId]/_components/PropertyDetails";
import { usePropertyCurrentDetails } from "@/hooks/properties/usePropertyCurrentDetails";
import { notFound, useSearchParams } from "next/navigation";
import PropertyDetailsSkeleton from "@/app/(home)/properties/[propertyId]/_components/PropertyDetailsSkeleton";
import ErrorComponent from "@/components/ErrorComponent";

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

  const { currentProperty, error, isLoading } = usePropertyCurrentDetails(
    propertyId,
    date,
  );

  if (isLoading) {
    return <PropertyDetailsSkeleton type="property" />;
  }
  if (error) {
    return <ErrorComponent message={error.message} fullPage />;
  }
  if (!currentProperty) {
    return notFound();
  }

  return <PropertyDetails property={currentProperty} propertyId={propertyId} />;
}
