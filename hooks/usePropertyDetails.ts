import { useQuery } from "@tanstack/react-query";
import propertyService from "@/services/propertyService";
import {
  CurrentAvailablePropertyType,
  LowestDailyRateType,
  RoomType,
} from "@/constants/Property";
import { useMemo } from "react";

export const usePropertyDetails = (
  propertyId: number,
  date: Date,
  roomId?: number,
) => {
  // Memoize the date to prevent unnecessary re-renders
  const memoizedDate = useMemo(() => date.toISOString().split("T")[0], [date]);

  const {
    data: currentProperty,
    error: propertyError,
    isLoading: propertyIsLoading,
  } = useQuery<CurrentAvailablePropertyType, Error>({
    queryKey: ["currentProperty", propertyId, memoizedDate],
    queryFn: () =>
      propertyService.getCurrentAvailableProperty({ propertyId, date }),
    staleTime: 1000 * 60 * 5, // 5 mins
    gcTime: 1000 * 60 * 10, // 10 mins
  });

  const {
    data: room,
    error: roomError,
    isLoading: roomIsLoading,
  } = useQuery<RoomType, Error>({
    queryKey: ["room", propertyId, roomId],
    queryFn: () => propertyService.getRoomById(propertyId, roomId!),
    enabled: !!roomId,
    staleTime: 1000 * 60 * 5, // 5 mins
    gcTime: 1000 * 60 * 10, // 10 mins
  });

  const isLoading = propertyIsLoading || (!!roomId && roomIsLoading);
  const error = propertyError || roomError;

  return {
    currentProperty,
    room,
    isLoading,
    error,
  };
};
