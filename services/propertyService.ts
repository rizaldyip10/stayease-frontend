import {
  PropertyAndRoomType,
  PropertyType,
  RoomType,
} from "@/constants/Property";
import axiosInterceptor from "@/utils/axiosInterceptor";

const propertyService = {
  getAllProperties: async (): Promise<PropertyAndRoomType[]> => {
    const response = await axiosInterceptor.get(
      config.endpoints.properties.getAllProperties,
    );
    return response.data;
  },

  getProperty: async (propertyId: number): Promise<PropertyAndRoomType> => {
    const url = config.endpoints.properties.getProperty.replace(
      "{propertyId}",
      propertyId.toString(),
    );
    const response = await axiosInterceptor.get(url);
    return response.data;
  },

  getRooms: async (propertyId: number): Promise<RoomType[]> => {
    const url = config.endpoints.properties.getRooms.replace(
      "{propertyId}",
      propertyId.toString(),
    );
    const response = await axiosInterceptor.get(url);
    return response.data;
  },

  getRoom: async (propertyId: number, roomId: number): Promise<Room> => {
    const url = config.endpoints.properties.getRoom
      .replace("{propertyId}", propertyId.toString())
      .replace("{roomId}", roomId.toString());
    const response = await axiosInterceptor.get(url);
    return response.data;
  },

  // Add other methods for creating, updating, and deleting properties and rooms as needed
};

export default propertyService;
