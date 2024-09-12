"use client";

import React from "react";
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
import { RoomType } from "@/constants/Property";

interface RoomDetailsProps {
  room: RoomType;
}

const RoomDetailsComponent: React.FC<RoomDetailsProps> = ({ room }) => {
  const { bookingValues, setBookingInfo } = useBookingValues();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "PPP") : null;
  };

  const handleDateSelect =
    (field: "checkInDate" | "checkOutDate") => (date: Date | undefined) => {
      if (date && isValid(date)) {
        setBookingInfo({ [field]: format(date, "yyyy-MM-dd") });
      }
    };

  const handleBookNow = () => {
    // Implement booking logic here
    console.log(
      "Booking room:",
      room.id,
      "with booking values:",
      bookingValues,
    );
    // You might want to navigate to a booking confirmation page or show a modal
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <img
            src={room.imageUrl || "/api/placeholder/800/400"}
            alt={room.name}
            className="w-full h-64 object-cover mb-4 rounded"
          />

          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <p>{room.description}</p>
            </TabsContent>
            <TabsContent value="amenities">
              <ul>
                <li>Capacity: {room.capacity} persons</li>
                {/* Add more amenities here based on your data structure */}
              </ul>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardContent className="p-4">
              <h2 className="text-2xl font-bold mb-2">
                IDR{room.basePrice} / night
              </h2>
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
              <Button className="w-full" onClick={handleBookNow}>
                Book Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsComponent;
