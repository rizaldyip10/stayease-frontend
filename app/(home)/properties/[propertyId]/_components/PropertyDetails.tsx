"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBookingValues } from "@/hooks/transactions/useBookingValues";
import RoomCard from "@/app/(home)/properties/[propertyId]/_components/RoomCard";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import { CurrentAvailablePropertyType } from "@/constants/Property";
import { usePropertyDetails } from "@/hooks/properties/usePropertyDetails";
import PropertyHeader from "@/app/(home)/properties/[propertyId]/_components/PropertyHeader";
import { useDateSelection } from "@/hooks/useDateSelection";

interface PropertyDetailsProps {
  property: CurrentAvailablePropertyType;
  propertyId: number;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
  propertyId,
}) => {
  const { bookingValues, setBookingInfo } = useBookingValues();
  const {
    selectedDate,
    checkInDate,
    checkOutDate,
    isSelectingCheckOut,
    isCalendarOpen,
    handleDateSelect,
    handleDateChange,
    handleReset,
    handleConfirm,
    setIsCalendarOpen,
  } = useDateSelection();

  // Use the hook to refetch data when selectedDate changes
  const { currentProperty, isLoading, error } = usePropertyDetails(
    propertyId,
    selectedDate,
  );

  const mapRef = useRef<HTMLDivElement>(null);

  const displayProperty = currentProperty || property;
  const availableRooms = useMemo(
    () => displayProperty?.rooms || [],
    [displayProperty],
  );
  const unavailableRooms = useMemo(
    () => displayProperty?.unavailableRooms || [],
    [displayProperty],
  );

  useEffect(() => {
    setBookingInfo({
      checkInDate: undefined,
      checkOutDate: undefined,
    });
  }, []);

  if (isLoading) return <div>Updating...</div>;
  if (error) return <div>Error updating: {error.message}</div>;

  return (
    <div className="container md:relative mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <PropertyHeader property={displayProperty} />

          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="facilities">Info</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <p>{displayProperty.description}</p>
            </TabsContent>
            <TabsContent value="facilities">
              <ul>
                <li>Address: {displayProperty.address}</li>
                <li>City: {displayProperty.city}</li>
                <li>Country: {displayProperty.country}</li>
                <li>Rooms: {property?.rooms?.length}</li>
                <li>
                  Total capacity:{" "}
                  {property?.rooms?.reduce(
                    (acc, room) => acc + room.roomCapacity,
                    0,
                  )}
                </li>
              </ul>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <div id="map" className="w-full h-64 bg-gray-200 mb-4"></div>
            <p>
              {displayProperty.address}, {displayProperty.city},{" "}
              {displayProperty.country}
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="side-cards flex flex-col gap-4 md:top-0">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Available Rooms for{" "}
                  {checkInDate ? format(checkInDate, "dd MMM yyyy") : "Today"}
                </h2>
                <div className="flex space-x-4 mb-4">
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        {checkInDate
                          ? `${format(checkInDate, "dd MMM yyyy")} - ${checkOutDate ? format(checkOutDate, "dd MMM yyyy") : "Select check-out"}`
                          : "Select dates"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <AvailabilityCalendar
                        propertyId={displayProperty.id}
                        onSelect={handleDateSelect}
                        onReset={handleReset}
                        onConfirm={handleConfirm}
                        selected={
                          isSelectingCheckOut ? checkOutDate : checkInDate
                        }
                        isCheckOut={isSelectingCheckOut}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        onDateChange={handleDateChange}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="mb-3">
                  <p>
                    Check-in:{" "}
                    {checkInDate
                      ? format(checkInDate, "dd MMM yyyy")
                      : "Not selected"}
                  </p>
                  <p>
                    Check-out:{" "}
                    {checkOutDate
                      ? format(checkOutDate, "dd MMM yyyy")
                      : "Not selected"}
                  </p>
                </div>
                <Button
                  className="w-full"
                  onClick={() =>
                    mapRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Check Availability
                </Button>
              </CardContent>
            </Card>
            {/*<Card>*/}
            {/*  <CardContent className="p-4">*/}
            {/*    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">*/}
            {/*      Map Placeholder*/}
            {/*    </div>*/}
            {/*  </CardContent>*/}
            {/*</Card>*/}
          </div>
        </div>
      </div>

      <div className="mt-8" ref={mapRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
            {availableRooms
              ?.sort((a, b) => a.basePrice - b.basePrice)
              .map((room) => (
                <RoomCard
                  key={room.roomId}
                  room={room}
                  bookingValues={bookingValues}
                  isAvailable={true}
                />
              ))}
            {unavailableRooms.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  Unavailable Rooms
                </h2>

                {unavailableRooms?.map((room) => (
                  <RoomCard
                    key={room.roomId}
                    room={room}
                    bookingValues={bookingValues}
                    isAvailable={false}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
