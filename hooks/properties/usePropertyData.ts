import { useEffect, useState } from "react";
import { PropertyAndRoomType, RoomType } from "@/constants/Property";
import propertyService from "@/services/propertyService";

export const usePropertyData = (propertyId: number) => {
  const [property, setProperty] = useState<PropertyAndRoomType | null>(null);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropertyAndRooms = async () => {
      try {
        const propertyData = await propertyService.getPropertyById(propertyId);
        setProperty(propertyData);
        setRooms(propertyData?.rooms ?? []);
      } catch (err) {
        setError("Failed to fetch property data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPropertyAndRooms().then(() => {});
  }, [propertyId]);

  const updateProperty = async (propertyData: any) => {
    const updatedProperty = await propertyService.updateProperty(
      propertyId,
      propertyData,
    );
    setProperty(updatedProperty);
  };

  const updateRooms = async (roomsData: any[]) => {
    for (const room of roomsData) {
      if (room.id) {
        await propertyService.updateRoom(propertyId, room.id, room);
      } else {
        await propertyService.createRoom(propertyId, room);
      }
    }
  };

  return {
    property,
    rooms,
    isLoading,
    error,
    updateProperty,
    updateRooms,
  };
};
