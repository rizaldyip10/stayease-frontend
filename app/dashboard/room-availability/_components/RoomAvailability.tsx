"use client";
import React, { useState } from "react";
import { useAvailability } from "@/hooks/useAvailability";
import AvailabilityDialog from "./AvailabilityDialog";
import { Button } from "@/components/ui/button";
import NoResultsFound from "@/components/NoResultsFound";
import RoomAvailabilityCalendar from "@/app/dashboard/room-availability/_components/RoomAvailabilityCalendar";
import ConfirmationDialog from "@/app/dashboard/room-availability/_components/ConfirmationDialog";

const RoomAvailability: React.FC = () => {
  const {
    availabilityData,
    isLoading,
    error,
    setAvailability,
    removeAvailability,
  } = useAvailability();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmitNewAvailability = (
    roomId: number,
    startDate: Date,
    endDate: Date,
  ) => {
    setAvailability(roomId, startDate, endDate);
    setIsDialogOpen(false);
  };

  const handleEventClick = (event: any) => {
    if (event.extendedProps.isManual) {
      setSelectedEvent(event);
      setIsConfirmDialogOpen(true);
    } else {
      alert("This unavailability cannot be removed as it's not manually set.");
    }
  };

  const handleConfirmRemove = () => {
    if (selectedEvent) {
      removeAvailability(
        selectedEvent.extendedProps.roomId,
        parseInt(selectedEvent.id),
      );
    }
    setIsConfirmDialogOpen(false);
    setSelectedEvent(null);
  };

  if (!availabilityData) return <NoResultsFound />;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-950">
        Room Availability
      </h1>
      <Button
        onClick={handleOpenDialog}
        className="bg-blue-950 text-appgray hover:bg-gray-400 hover:text-blue-950 mt-5"
      >
        Set Availability
      </Button>
      <p className="text-red-500 font-semibold text-sm mb-4">
        *Unavailabilities marked as (Booked) cannot be manually removed.
      </p>
      <RoomAvailabilityCalendar
        availabilityData={availabilityData}
        onDateSelect={handleOpenDialog}
        onEventClick={handleEventClick}
      />
      <AvailabilityDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitNewAvailability}
      />
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleConfirmRemove}
        title="Remove Unavailability"
        description="Are you sure you want to remove this unavailability?"
      />
    </div>
  );
};

export default RoomAvailability;
