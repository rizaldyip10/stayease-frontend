"use client";
import React from "react";
import { notFound } from "next/navigation";
import RoomDetails from "@/app/(home)/properties/[propertyId]/rooms/[roomId]/_components/RoomDetails";
import { usePropertyCurrentDetails } from "@/hooks/properties/usePropertyCurrentDetails";
import { useSearchParams } from "next/navigation";
import PropertyDetailsSkeleton from "@/app/(home)/properties/[propertyId]/_components/PropertyDetailsSkeleton";
import ErrorComponent from "@/components/ErrorComponent";

export default function RoomDetailsPage({
  params,
}: {
  params: { propertyId: string; roomId: string };
}) {
  const searchParams = useSearchParams();
  const propertyId = parseInt(params.propertyId, 10);
  const roomId = parseInt(params.roomId, 10);

  // Extract the date from the URL, defaulting to today if not present
  const checkInDate = searchParams.get("checkInDate");
  const date = checkInDate ? new Date(checkInDate) : new Date();

  const { currentProperty, isLoading, error } = usePropertyCurrentDetails(
    propertyId,
    date,
    roomId,
  );

  const room = currentProperty?.rooms?.find((room) => room.roomId === roomId);

  if (isLoading) {
    return <PropertyDetailsSkeleton type="room" />;
  }

  if (error) {
    return <ErrorComponent message={error.message} fullPage />;
  }

  if (!room) {
    return notFound();
  }

  return <RoomDetails room={room} />;
}
