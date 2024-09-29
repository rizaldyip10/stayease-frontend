import propertyService from "@/services/propertyService";
import {
  CurrentAvailablePropertyType,
  RoomWithAdjustedRatesType,
} from "@/constants/Property";
import { useMemo } from "react";
import { useFetchData } from "@/hooks/utils/useFetchData";

/**
 * usePropertyCurrentDetails - A custom hook to fetch the current property and room details
 * along with the availability and adjusted price of the rooms.
 *
 * @param {number} propertyId - The ID of the property to fetch details for.
 * @param {Date} date - The date for which to fetch the property and room details.
 * @param {number} [roomId] - Optional. The ID of the room to fetch details for.
 *
 * @returns {Object} - An object containing the following properties:
 *   - currentProperty: The current available property details.
 *   - room: The details of the room with adjusted rates.
 *   - isLoading: A boolean indicating if the data is currently being loaded.
 *   - error: An error object if there was an error fetching the data.
 **/

export const usePropertyCurrentDetails = (
  propertyId: number,
  date: Date,
  roomId?: number,
) => {
  // Memoize the date to prevent unnecessary re-renders
  const memoizedDate = useMemo(() => {
    if (!date || isNaN(date.getTime())) {
      // If date is null or invalid, use today's date
      return new Date().toISOString().split("T")[0];
    }
    return date.toISOString().split("T")[0];
  }, [date]);

  const {
    data: currentProperty,
    error: propertyError,
    isLoading: propertyIsLoading,
  } = useFetchData<CurrentAvailablePropertyType>(
    `currentProperty-${propertyId}-${memoizedDate}`,
    () => propertyService.getCurrentAvailableProperty({ propertyId, date }),
  );

  const {
    data: currentRoom,
    error: roomError,
    isLoading: roomIsLoading,
  } = useFetchData<RoomWithAdjustedRatesType>(
    `currentRoom-${propertyId}-${roomId}-${memoizedDate}`,
    () => propertyService.getCurrentRoom(propertyId, roomId!, date),
    { enabled: !!roomId },
  );

  const isLoading = propertyIsLoading || (!!roomId && roomIsLoading);
  const error = propertyError || roomError;

  return {
    currentProperty,
    currentRoom,
    isLoading,
    error,
  };
};
