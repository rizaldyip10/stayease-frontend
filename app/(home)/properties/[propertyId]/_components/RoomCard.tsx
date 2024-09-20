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
  const roomDetailsUrl = `/properties/${room.propertyId}/rooms/${room.roomId}?${new URLSearchParams(
    Object.fromEntries(
      Object.entries(bookingValues).filter(
        ([key, value]) => value !== null && value !== undefined,
      ),
    ),
  ).toString()}`;

  return (
    <Card
      className={`mb-6 transition-all duration-300 hover:shadow-lg ${!isAvailable ? "opacity-70" : ""}`}
    >
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 relative">
            <Image
              src={`${room.imageUrl ? room.imageUrl : "/images/room-placeholder.jpg"}`}
              alt={room.roomName}
              width={400}
              height={300}
              className={`w-full h-48 md:h-full object-cover ${!isAvailable ? "grayscale" : ""}`}
            />
          </div>
          <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">{room.roomName}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Capacity: {room.roomCapacity} persons
              </p>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="text-lg font-bold mb-2 sm:mb-0">
                <span className="text-xs font-light block">
                  {isAvailable ? "Price" : "Base price"}
                </span>
                <p className="text-2xl">
                  IDR{" "}
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(
                    "adjustedPrice" in room
                      ? room.adjustedPrice
                      : room.basePrice,
                  )}
                </p>
                <span className="text-xs font-light">per night</span>
              </div>
              {isAvailable ? (
                <Link href={roomDetailsUrl} passHref>
                  <Button className="w-full sm:w-auto mt-2 sm:mt-0">
                    View Details
                  </Button>
                </Link>
              ) : (
                <p className="text-red-500 font-semibold mt-2 sm:mt-0">
                  Not available for selected date
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;