import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdjustedRatesType, UnavailableRoomType } from "@/constants/Property";
import Image from "next/image";

interface RoomCardProps {
  room: AdjustedRatesType | UnavailableRoomType;
  bookingValues: Record<string, string>;
  isAvailable: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  bookingValues,
  isAvailable,
}) => {
  const roomDetailsUrl = `/properties/${room.propertyId}/rooms/${room.roomId}?${new URLSearchParams(bookingValues as Record<string, string>).toString()}`;

  return (
    <Card className={`mb-4 ${!isAvailable ? "opacity-50" : ""}`}>
      <CardContent className="p-4">
        <Image
          src={`${room.imageUrl ? room.imageUrl : "/images/room-placeholder.jpg"}`}
          alt={room.roomName}
          width={400}
          height={200}
          className={`w-full h-48 object-cover mb-4 ${!isAvailable ? "grayscale" : ""}`}
        />
        <h3 className="text-lg font-semibold mb-2">{room.roomName}</h3>
        <p className="text-sm text-gray-600 mb-2">
          Capacity: {room.roomCapacity} persons
        </p>
        <div className="text-lg font-bold mb-2 flex-col">
          <span className="text-xs font-light">
            {isAvailable ? "Price" : "Base price"}
          </span>
          <p>
            IDR{" "}
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(
              "adjustedPrice" in room ? room.adjustedPrice : room.basePrice,
            )}{" "}
            / night
          </p>
        </div>
        {isAvailable ? (
          <Link href={roomDetailsUrl} passHref>
            <Button className="w-full">View Details</Button>
          </Link>
        ) : (
          <p className="text-red-500 font-semibold">
            Not available for selected date
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomCard;
