import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RoomType } from "@/constants/Property";

interface RoomCardProps {
  room: RoomType;
  bookingValues: Record<string, string>;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, bookingValues }) => {
  const roomDetailsUrl = `/properties/${room.propertySummary.propertyId}/rooms/${room.id}?${new URLSearchParams(bookingValues as Record<string, string>).toString()}`;

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
        <p className="text-sm text-gray-600 mb-2">
          Capacity: {room.capacity} persons
        </p>
        <p className="text-lg font-bold mb-2">€{room.basePrice} / night</p>
        <Link href={roomDetailsUrl} passHref>
          <Button className="w-full">View Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
