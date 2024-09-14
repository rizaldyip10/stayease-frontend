"use client";
import React, { useEffect, useState } from "react";
import {
  AdjustedRatesType,
  CurrentAvailablePropertyType,
  PropertyAndRoomType,
  PropertyType,
  UnavailableRoomType,
} from "@/constants/Property";
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
import axios from "axios";

interface PropertyDetailsProps {
  property: CurrentAvailablePropertyType;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [isSelectingCheckOut, setIsSelectingCheckOut] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { bookingValues, setBookingInfo } = useBookingValues();

  const [availableRooms, setAvailableRooms] = useState<AdjustedRatesType[]>(
    property.rooms || [],
  );
  const [unavailableRooms, setUnavailableRooms] = useState<
    UnavailableRoomType[]
  >(property.unavailableRooms || []);

  useEffect(() => {
    fetchRoomsForDate(new Date());
  }, []);

  const fetchRoomsForDate = async (date: Date) => {
    try {
      const propertyId = property.id;
      console.log("Fetching rooms for id:", propertyId);
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await axios.get(
        `http://localhost:8080/api/v1/properties/${propertyId}/available`,
        {
          params: { date: formattedDate }, // This ensures cookies are sent with the request
        },
      );

      console.log("Fetched rooms for date:", response.data);

      if (response.data && response.data.data) {
        setAvailableRooms(response.data.data.rooms || []);
        setUnavailableRooms(response.data.data.unavailableRooms || []);
        console.log("Available rooms:", availableRooms);
        console.log("Unavailable rooms:", unavailableRooms);
      } else {
        console.error("Unexpected data structure:", response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error fetching rooms:",
          error.response?.data || error.message,
        );
      } else {
        console.error("Error fetching rooms:", error);
      }
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!isSelectingCheckOut) {
      // Selecting check-in date
      if (date && checkInDate && date.getTime() === checkInDate.getTime()) {
        // Clicked on the same check-in date, reset
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
          console.log(`Formatted checkInDate:`, formattedDate);
          setBookingInfo({
            checkInDate: formattedDate,
            checkOutDate: undefined,
          });
          fetchRoomsForDate(date);
        }
      }
    } else {
      // Selecting check-out date
      setCheckOutDate(date);
      setIsSelectingCheckOut(false);
      if (date && isValid(date)) {
        const formattedDate = format(date, "yyyy-MM-dd");
        console.log(`Formatted checkOutDate:`, formattedDate);
        setBookingInfo({ checkOutDate: formattedDate });
      }
    }
  };

  const handleDateChange = (date: Date) => {
    fetchRoomsForDate(date);
  };

  const handleReset = () => {
    setCheckInDate(undefined);
    setCheckOutDate(undefined);
    setIsSelectingCheckOut(false);
    setBookingInfo({ checkInDate: null, checkOutDate: undefined });
    fetchRoomsForDate(new Date());
  };

  const handleConfirm = () => {
    setIsCalendarOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{property.propertyName}</h1>
          <div className="flex items-center mb-4">
            <p className="text-sm text-gray-600 mr-4">{property.address}</p>
            {/*<Button variant="outline" size="sm" className="mr-2">*/}
            {/*  <Heart className="mr-2 h-4 w-4" /> Save*/}
            {/*</Button>*/}
            {/*<Button variant="outline" size="sm">*/}
            {/*  <Share2 className="mr-2 h-4 w-4" /> Share*/}
            {/*</Button>*/}
          </div>
          <img
            src={property.imageUrl || "/api/placeholder/800/400"}
            alt={property.propertyName}
            className="w-full h-64 object-cover mb-4 rounded"
          />

          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="facilities">Info</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <p>{property.description}</p>
            </TabsContent>
            <TabsContent value="facilities">
              <ul>
                <li>Address: {property.address}</li>
                <li>City: {property.city}</li>
                <li>Country: {property.country}</li>
                <li>Rooms: {property?.rooms?.length}</li>
                <li>
                  Total capacity:{" "}
                  {property?.rooms?.reduce(
                    (acc, room) => acc + room.capacity,
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
              {property.address}, {property.city}, {property.country}
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
                      propertyId={property.id}
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
