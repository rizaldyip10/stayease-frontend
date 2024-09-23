"use client";
import React, { useState } from "react";
import { useAvailability } from "@/hooks/useAvailability";
import AvailabilityDialog from "./AvailabilityDialog";
import { Button } from "@/components/ui/button";
import NoResultsFound from "@/components/NoResultsFound";
import AvailabilityTable from "@/app/dashboard/room-availability/_components/availability-table/AvailabilityTable";

const RoomAvailability: React.FC = () => {
  const {
    availabilityData,
    isLoading,
    error,
    setAvailability,
    removeAvailability,
  } = useAvailability();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  if (!availabilityData) return <NoResultsFound />;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
        *Rooms with a disabled remove button are booked and cannot be manually
        removed.
      </p>
      {availabilityData.map((room) => (
        <div key={room.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-950">
            {room.propertySummary.propertyName} - {room.name}
          </h2>
          <AvailabilityTable
            availability={room.roomAvailability}
            onRemove={(availabilityId) =>
              removeAvailability(room.id, availabilityId)
            }
          />
        </div>
      ))}
      <AvailabilityDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={setAvailability}
      />
    </div>
  );
};

export default RoomAvailability;
