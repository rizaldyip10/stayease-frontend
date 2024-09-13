"use client";
import React, { useState } from "react";
import { PropertyAndRoomType, PropertyType } from "@/constants/Property";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Heart, Share2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isValid, parseISO } from "date-fns";
import { useBookingValues } from "@/hooks/useBookingValues";
import RoomCard from "@/app/(user)/properties/[propertyId]/_components/RoomCard";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";

interface PropertyDetailsProps {
  property: PropertyAndRoomType;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  const { propertyName, description, address, imageUrl, city, country, rooms } =
    property;
  const { bookingValues, setBookingInfo } = useBookingValues();

  const handleDateSelect =
    (field: "checkInDate" | "checkOutDate") => (date: Date | undefined) => {
      if (date && isValid(date)) {
        setBookingInfo({ [field]: format(date, "yyyy-MM-dd") });
      }
    };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "PPP") : null;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{property.propertyName}</h1>
          <div className="flex items-center mb-4">
            <p className="text-sm text-gray-600 mr-4">{property.address}</p>
            <Button variant="outline" size="sm" className="mr-2">
              <Heart className="mr-2 h-4 w-4" /> Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
          <img
            src={property.imageUrl || "/api/placeholder/800/400"}
            alt={property.propertyName}
            className="w-full h-64 object-cover mb-4 rounded"
          />

          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <p>{property.description}</p>
            </TabsContent>
            <TabsContent value="facilities">
              <ul>{/* Add facilities here based on your data structure */}</ul>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <div id="map" className="w-full h-64 bg-gray-200 mb-4"></div>
            <p>
              {property.address}, {property.city}, {property.country}
            </p>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-4">
              <h2 className="text-2xl font-semibold mb-4">
                Check Availability
              </h2>
              <div className="flex space-x-4 mb-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      {formatDate(bookingValues.checkInDate) || "Check-in Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <AvailabilityCalendar
                      propertyId={property.id}
                      onSelect={handleDateSelect("checkInDate")}
                      selected={
                        bookingValues.checkInDate
                          ? parseISO(bookingValues.checkInDate)
                          : undefined
                      }
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
                    <AvailabilityCalendar
                      propertyId={property.id}
                      onSelect={handleDateSelect("checkOutDate")}
                      selected={
                        bookingValues.checkOutDate
                          ? parseISO(bookingValues.checkOutDate)
                          : undefined
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button className="w-full">Check Availability</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
              {property?.rooms?.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  bookingValues={bookingValues}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
