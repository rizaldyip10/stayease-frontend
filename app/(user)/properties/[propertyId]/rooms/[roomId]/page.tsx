import React from "react";
import { notFound } from "next/navigation";
import RoomDetails from "@/app/(user)/properties/[propertyId]/rooms/[roomId]/_components/RoomDetails";

async function getRoomDetails(propertyId: number, roomId: number) {
  // TODO : fetch room details from API
  try {
    const res = await fetch(
      `http://localhost:8080/api/v1/properties/${propertyId}/rooms/${roomId}`,
    );
    const data = await res.json();
    console.log("data", data.data);
    return data.data;
  } catch {
    return undefined;
  }
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
