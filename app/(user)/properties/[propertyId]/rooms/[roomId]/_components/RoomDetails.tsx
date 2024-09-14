"use client";

import React, { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, isValid, parseISO } from "date-fns";
import { useBookingValues } from "@/hooks/useBookingValues";
import { AdjustedRatesType, UnavailableRoomType } from "@/constants/Property";

interface RoomDetailsProps {
  room: AdjustedRatesType;
}

const RoomDetailsComponent: React.FC<RoomDetailsProps> = ({ room }) => {
  const { bookingValues, setBookingInfo } = useBookingValues();

  const formatDate = useCallback((dateString: string | null) => {
    if (!dateString) return null;
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "PPP") : null;
  }, []);

  const handleDateSelect = useCallback(
    (field: "checkInDate" | "checkOutDate") => (date: Date | undefined) => {
      if (date && isValid(date)) {
        setBookingInfo({ [field]: format(date, "yyyy-MM-dd") });
      }
    },
    [setBookingInfo],
  );

  const handleBookNow = useCallback(() => {
    console.log(
      "Booking room:",
      room.roomId,
      "with booking values:",
      bookingValues,
    );
  }, [room.roomId, bookingValues]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const priceChange = room.adjustedPrice - room.basePrice;
  const percentageChange = ((priceChange / room.basePrice) * 100).toFixed(1);
  const isIncrease = priceChange > 0;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{room.roomName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <img
            src={room.imageUrl || "/api/placeholder/800/400"}
            alt={room.roomName}
            className="w-full h-64 object-cover mb-4 rounded"
          />

          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <p>{room.roomDescription}</p>
            </TabsContent>
            <TabsContent value="amenities">
              <ul>
                <li>Capacity: {room.roomCapacity} persons</li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-light">Price per night:</p>
              <h2 className="text-2xl font-bold mb-2">
                {formatPrice(room.adjustedPrice)}
              </h2>
              {priceChange !== 0 && (
                <div className="mb-2">
                  <p className="text-sm text-gray-500 line-through">
                    {formatPrice(room.basePrice)}
                  </p>
                  <p
                    className={`text-sm ${isIncrease ? "text-red-600" : "text-green-600"}`}
                  >
                    {isIncrease ? "Increased" : "Decreased"} by{" "}
                    {Math.abs(Number(percentageChange))}%
                  </p>
                </div>
              )}
              <div className="flex flex-col space-y-4 mb-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      {formatDate(bookingValues.checkInDate) || "Check-in Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={
                        bookingValues.checkInDate
                          ? parseISO(bookingValues.checkInDate)
                          : undefined
                      }
                      onSelect={handleDateSelect("checkInDate")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      {formatDate(bookingValues.checkOutDate) ||
                        "Check-out Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={
                        bookingValues.checkOutDate
                          ? parseISO(bookingValues.checkOutDate)
                          : undefined
                      }
                      onSelect={handleDateSelect("checkOutDate")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button
                className="w-full"
                onClick={handleBookNow}
                disabled={!room.isAvailable}
              >
                {room.isAvailable ? "Book Now" : "Not Available"}
              </Button>
              {!room.isAvailable && (
                <p className="text-red-500 mt-2 text-sm">
                  This room is not available for the selected date.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsComponent;
