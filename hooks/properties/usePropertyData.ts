import { useEffect, useState } from "react";
import {
  CategoryType,
  PropertyAndRoomType,
  RoomType,
} from "@/constants/Property";
import propertyService from "@/services/propertyService";

export const usePropertyData = (propertyId: number) => {
  const [property, setProperty] = useState<PropertyAndRoomType | null>(null);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropertyAndRooms = async () => {
      try {
        const [propertyData, categoriesData] = await Promise.all([
          propertyService.getPropertyById(propertyId),
          propertyService.getAllCategories(),
        ]);

        setProperty(propertyData);
        setRooms(propertyData?.rooms ?? []);
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to fetch property data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPropertyAndRooms();
  }, [propertyId]);

  const updateProperty = async (propertyData: any) => {
    const categoryId = categories.find(
      (cat) => cat.name === propertyData.category,
    )?.id;

    const updatedPropertyData = {
      ...propertyData,
      categoryId: categoryId,
    };

    console.log("updatedPropertyData", updatedPropertyData);

    const updatedProperty = await propertyService.updateProperty(
      propertyId,
      updatedPropertyData,
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
