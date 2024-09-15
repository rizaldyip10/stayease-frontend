"use client";
import React, { useMemo } from "react";
import PropertyDetails from "@/app/(user)/properties/[propertyId]/_components/PropertyDetails";
import { usePropertyDetails } from "@/hooks/usePropertyDetails";
import { notFound, useSearchParams } from "next/navigation";

export default function PropertyDetailsPage({
  params,
}: {
  params: { propertyId: string };
}) {
  const searchParams = useSearchParams();
  const checkInDate = searchParams.get("checkInDate");

  let date = new Date();
  const timezoneOffset = date.getTimezoneOffset();
  date = new Date(date.getTime() - timezoneOffset * 60 * 1000);
  if (checkInDate !== null) {
    date = new Date(checkInDate);
  }

  const timezone = date.getTimezoneOffset();
  console.log("timezone", timezone);

  const propertyId = useMemo(
    () => parseInt(params.propertyId, 10),
    [params.propertyId],
  );
  const { currentProperty, error, isLoading } = usePropertyDetails(
    propertyId,
    date,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!currentProperty) {
    return notFound();
  }

  return <PropertyDetails property={currentProperty} propertyId={propertyId} />;
}
