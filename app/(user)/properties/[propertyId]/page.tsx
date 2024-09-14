"use client";
import React, { useMemo } from "react";
import PropertyDetails from "@/app/(user)/properties/[propertyId]/_components/PropertyDetails";
import { usePropertyDetails } from "@/hooks/usePropertyDetails";
import { notFound } from "next/navigation";

export default function PropertyDetailsPage({
  params,
}: {
  params: { propertyId: string };
}) {
  const propertyId = useMemo(
    () => parseInt(params.propertyId, 10),
    [params.propertyId],
  );
  const date = useMemo(() => new Date(), []); // This ensures the date doesn't change on every render
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
