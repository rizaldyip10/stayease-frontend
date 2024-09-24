import { useState } from "react";
import {
  availabilityService,
  TenantRoomAvailabilityType,
} from "@/services/availabilityService";
import { useAlert } from "@/context/AlertContext";
import { useFetchData } from "@/hooks/utils/useFetchData";

export const useAvailability = () => {
  const [error, setError] = useState<string | null>(null);
  const { showAlert } = useAlert();

  const {
    data: availabilityData,
    error: dataError,
    isLoading: dataLoading,
  } = useFetchData<TenantRoomAvailabilityType[]>(
    "availabilityData",
    async () => {
      return availabilityService.getTenantRoomAvailability();
    },
  );

  const setAvailability = async (
    roomId: number,
    startDate: Date,
    endDate: Date,
  ) => {
    try {
      await availabilityService.setAvailability(roomId, { startDate, endDate });
      await availabilityService.getTenantRoomAvailability();
      showAlert(
        "success",
        "Availability set successfully",
        "/dashboard/room-availability",
      );
    } catch (err: any) {
      setError("Failed to set availability: " + err.message);
      showAlert("error", "Failed to set availability: " + err.message);
    }
  };

  const removeAvailability = async (roomId: number, availabilityId: number) => {
    try {
      await availabilityService.removeAvailability(roomId, availabilityId);
      await availabilityService.getTenantRoomAvailability();
      showAlert(
        "success",
        "Availability removed successfully",
        "/dashboard/room-availability",
      );
    } catch (err: any) {
      setError("Failed to remove availability: " + err.message);
      showAlert("error", "Failed to remove availability: " + err.message);
    }
  };

  return {
    availabilityData,
    isLoading: dataLoading,
    error: error || dataError,
    setAvailability,
    removeAvailability,
  };
};
