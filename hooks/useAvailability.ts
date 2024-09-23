import { useState, useEffect } from "react";
import {
  availabilityService,
  TenantRoomAvailabilityType,
} from "@/services/availabilityService";

export const useAvailability = () => {
  const [availabilityData, setAvailabilityData] = useState<
    TenantRoomAvailabilityType[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAvailabilityData();
  }, []);

  const fetchAvailabilityData = async () => {
    try {
      setIsLoading(true);
      const data = await availabilityService.getTenantRoomAvailability();
      setAvailabilityData(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch availability data");
    } finally {
      setIsLoading(false);
    }
  };

  const setAvailability = async (
    roomId: number,
    startDate: Date,
    endDate: Date,
  ) => {
    try {
      await availabilityService.setAvailability(roomId, { startDate, endDate });
      await fetchAvailabilityData();
    } catch (err) {
      setError("Failed to set availability");
    }
  };

  const removeAvailability = async (roomId: number, availabilityId: number) => {
    try {
      await availabilityService.removeAvailability(roomId, availabilityId);
      await fetchAvailabilityData();
    } catch (err) {
      setError("Failed to remove availability");
    }
  };

  return {
    availabilityData,
    isLoading,
    error,
    setAvailability,
    removeAvailability,
  };
};
