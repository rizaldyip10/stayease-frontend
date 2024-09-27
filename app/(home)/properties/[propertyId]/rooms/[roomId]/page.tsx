"use client";
import React from "react";
import { notFound } from "next/navigation";
import RoomDetails from "@/app/(home)/properties/[propertyId]/rooms/[roomId]/_components/RoomDetails";
import { usePropertyDetails } from "@/hooks/properties/usePropertyDetails";
import { useSearchParams } from "next/navigation";
import PropertyDetailsSkeleton from "@/app/(home)/properties/[propertyId]/_components/PropertyDetailsSkeleton";

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

  const { currentProperty, isLoading, error } = usePropertyDetails(
    propertyId,
    date,
    roomId,
  );

  const room = currentProperty?.rooms?.find((room) => room.roomId === roomId);

  if (isLoading) {
    return <PropertyDetailsSkeleton type="room" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!room) {
    return notFound();
  }

  return <RoomDetails room={room} />;
}
