"use client";
import React, { useState, useCallback, useMemo } from "react";
import { format, isValid } from "date-fns";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBookingValues } from "@/hooks/useBookingValues";
import RoomCard from "@/app/(user)/properties/[propertyId]/_components/RoomCard";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import { CurrentAvailablePropertyType } from "@/constants/Property";
import { usePropertyDetails } from "@/hooks/usePropertyDetails";

interface PropertyDetailsProps {
  property: CurrentAvailablePropertyType;
  propertyId: number;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
  propertyId,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [isSelectingCheckOut, setIsSelectingCheckOut] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { bookingValues, setBookingInfo } = useBookingValues();

  // Use the hook to refetch data when selectedDate changes
  const { currentProperty, isLoading, error } = usePropertyDetails(
    propertyId,
    selectedDate,
  );

  const handleDateSelect = useCallback(
    (date: Date | undefined) => {
      if (!isSelectingCheckOut) {
        if (date && checkInDate && date.getTime() === checkInDate.getTime()) {
          setCheckInDate(undefined);
          setCheckOutDate(undefined);
          setIsSelectingCheckOut(false);
          setBookingInfo({ checkInDate: null, checkOutDate: undefined });
        } else {
          setCheckInDate(date);
          setCheckOutDate(undefined);
          setIsSelectingCheckOut(true);
          if (date && isValid(date)) {
            const formattedDate = format(date, "yyyy-MM-dd");
            setBookingInfo({
              checkInDate: formattedDate,
              checkOutDate: undefined,
            });
            setSelectedDate(date); // Update selected date to fetch new data
          }
        }
      } else {
        setCheckOutDate(date);
        setIsSelectingCheckOut(false);
        if (date && isValid(date)) {
          const formattedDate = format(date, "yyyy-MM-dd");
          setBookingInfo({ checkOutDate: formattedDate });
        }
      }
    },
    [isSelectingCheckOut, checkInDate, setBookingInfo],
  );

  const handleDateChange = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const handleReset = useCallback(() => {
    setCheckInDate(undefined);
    setCheckOutDate(undefined);
    setIsSelectingCheckOut(false);
    setBookingInfo({ checkInDate: null, checkOutDate: undefined });
    setSelectedDate(new Date());
  }, [setBookingInfo]);

  const handleConfirm = useCallback(() => {
    setIsCalendarOpen(false);
  }, []);

  const displayProperty = currentProperty || property;
  const availableRooms = useMemo(
    () => displayProperty?.rooms || [],
    [displayProperty],
  );
  const unavailableRooms = useMemo(
    () => displayProperty?.unavailableRooms || [],
    [displayProperty],
  );

  if (isLoading) return <div>Updating...</div>;
  if (error) return <div>Error updating: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">
            {displayProperty.propertyName}
          </h1>
          <div className="flex items-center mb-4">
            <p className="text-sm text-gray-600 mr-4">
              {displayProperty.address}
            </p>
            {/*<Button variant="outline" size="sm" className="mr-2">*/}
            {/*  <Heart className="mr-2 h-4 w-4" /> Save*/}
            {/*</Button>*/}
            {/*<Button variant="outline" size="sm">*/}
            {/*  <Share2 className="mr-2 h-4 w-4" /> Share*/}
            {/*</Button>*/}
          </div>
          <img
            src={displayProperty.imageUrl || "/api/placeholder/800/400"}
            alt={displayProperty.propertyName}
            className="w-full h-64 object-cover mb-4 rounded"
          />

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

        <div>
          <Card>
            <CardContent className="p-4">
              <h2 className="text-2xl font-semibold mb-4">
                Available Rooms for{" "}
                {checkInDate ? format(checkInDate, "dd MMM yyyy") : "Today"}
              </h2>
              <div className="flex space-x-4 mb-4">
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
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
              <Button className="w-full">Check Availability</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
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
