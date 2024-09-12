import React from "react";
import { notFound } from "next/navigation";
import RoomDetails from "@/app/(user)/properties/[propertyId]/rooms/[roomId]/_components/RoomDetails";

async function getRoomDetails(propertyId: number, roomId: number) {
  // TODO : fetch room details from API
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties/${propertyId}/rooms/${roomId}`, {
  //   next: { revalidate: 60 },
  // });
  //
  // if (!res.ok) {
  //   if (res.status === 404) {
  //     return null; // Room not found
  //   }
  //   throw new Error('Failed to fetch room details');
  // }
  //
  // return res.json();
  return {
    id: 1,
    name: "Ocean View Suite",
    description: "Spacious suite with a stunning view of the ocean.",
    imageUrl: "https://example.com/ocean-view-suite.jpg",
    basePrice: 200,
    capacity: 2,
    propertySummary: {
      propertyId: 1,
      propertyName: "Ocean Breeze Apartment",
    },
  };
}

export default async function RoomDetailsPage({
  params,
}: {
  params: { propertyId: string; roomId: string };
}) {
  const propertyId = parseInt(params.propertyId, 10);
  const roomId = parseInt(params.roomId, 10);

  const roomDetails = await getRoomDetails(propertyId, roomId);

  if (!roomDetails) {
    notFound();
  }

  return <RoomDetails room={roomDetails} />;
}
