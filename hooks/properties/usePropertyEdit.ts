import propertyService from "@/services/propertyService";
import { useAlert } from "@/context/AlertContext";
import { useState } from "react";
import { handleAsyncRequest } from "@/utils/handleAsyncRequest";
import { useQueryClient } from "@tanstack/react-query";

export const usePropertyEdit = (propertyId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  const updateProperty = (propertyData: any) =>
    handleAsyncRequest(
      setIsLoading,
      setError,
      () => propertyService.updateProperty(propertyId, propertyData),
      () =>
        showAlert(
          "success",
          "Property updated successfully",
          "/dashboard/properties",
        ),
      (err) => showAlert("error", err.message ?? "Failed to update property"),
    );

  const updateRooms = (rooms: any) =>
    handleAsyncRequest(setIsLoading, setError, async () => {
      for (const room of rooms) {
        if (room.id) {
          await propertyService.updateRoom(propertyId, room.id, room);
        } else {
          await propertyService.createRoom(propertyId, room);
        }
      }
    });

  const handleSubmit = async (values: any) => {
    await updateProperty(values.property);
    await updateRooms(values.rooms);
    await queryClient.invalidateQueries();
  };

  const handleRemoveRoom = (roomId: number) =>
    handleAsyncRequest(
      setIsLoading,
      setError,
      () => propertyService.deleteRoom(propertyId, roomId),
      () => showAlert("success", "Room deleted successfully"),
      (err) => showAlert("error", err.message ?? "Failed to delete room"),
    );

  return {
    isLoading,
    error,
    handleSubmit,
    handleRemoveRoom,
  };
};
