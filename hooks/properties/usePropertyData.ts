import { PropertyAndRoomType } from "@/constants/Property";
import propertyService from "@/services/propertyService";
import { useFetchData } from "@/hooks/utils/useFetchData";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { handleAsyncRequest } from "@/utils/handleAsyncRequest";
import { useAlert } from "@/context/AlertContext";

export const usePropertyData = (propertyId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  const {
    data: propertyById,
    error: propertyError,
    isLoading: propertyIsLoading,
  } = useFetchData<PropertyAndRoomType>(`propertyById-${propertyId}`, () =>
    propertyService.getPropertyById(propertyId),
  );

  const fetchPropertyById = async () => {
    await queryClient.invalidateQueries({
      queryKey: [`propertyById-${propertyId}`],
    });
  };

  const {
    data: isOwner,
    error: ownerError,
    isLoading: ownerIsLoading,
  } = useFetchData<boolean>(`isPropertyOwner-${propertyId}`, () =>
    propertyService.checkPropertyOwnership(propertyId),
  );

  const deleteProperty = async () => {
    await handleAsyncRequest(
      setIsLoading,
      setError,
      () => propertyService.deleteProperty(propertyId),
      () => showAlert("success", "Property deleted successfully"),
      (error) =>
        showAlert("error", error.message ?? "Failed to delete property"),
    );
    await queryClient.invalidateQueries({
      queryKey: ["get-tenant-properties"],
    });
  };

  const deleteRoom = async (roomId: number) => {
    await handleAsyncRequest(
      setIsLoading,
      setError,
      () => propertyService.deleteRoom(propertyId, roomId),
      () => showAlert("success", "Room deleted successfully"),
      (error) => showAlert("error", error.message ?? "Failed to delete room"),
    );
    await queryClient.invalidateQueries({ queryKey: ["get-tenant-room"] });
  };

  return {
    propertyById,
    isOwner,
    fetchPropertyById,
    deleteProperty,
    deleteRoom,
    isLoading,
    error,
  };
};
