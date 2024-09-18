import { config } from "@/constants/url";
import axiosInterceptor from "@/utils/axiosInterceptor";
import {
  CategoryType,
  PropertyAndRoomType,
  RoomType,
} from "@/constants/Property";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

const propertyService = {
  getAllProperties: async (): Promise<PropertyAndRoomType[]> => {
    const response = await axiosInterceptor.get(
      config.endpoints.properties.getAllProperties,
    );
    return response.data.data;
  },

  getPropertyById: async (propertyId: number): Promise<PropertyAndRoomType> => {
    const url = config.endpoints.properties.getProperty.replace(
      "{propertyId}",
      propertyId.toString(),
    );
    const response = await axiosInterceptor.get(url);
    return response.data.data;
  },

  getRoomsByPropertyId: async (propertyId: number): Promise<RoomType[]> => {
    const url = config.endpoints.properties.getRooms.replace(
      "{propertyId}",
      propertyId.toString(),
    );
    const response = await axiosInterceptor.get(url);
    return response.data.data;
  },

  getTenantProperties: async (): Promise<PropertyAndRoomType[]> => {
    const response = await axiosInterceptor.get(
      config.endpoints.properties.getTenantProperties,
    );
    return response.data.data;
  },

  getTenantRooms: async (): Promise<RoomType[]> => {
    const response = await axiosInterceptor.get(
        config.endpoints.properties.getTenantRooms,
    );
    return response.data.data;
  },

  createProperty: async (
    data: Partial<PropertyAndRoomType>,
  ): Promise<PropertyAndRoomType> => {
    const response = await axiosInterceptor.post(
      config.endpoints.properties.createProperty,
      data,
    );
    return response.data.data;
  },

  updateProperty: async (
    propertyId: number,
    data: any,
  ): Promise<PropertyAndRoomType> => {
    const url = config.endpoints.properties.updateProperty.replace(
      "{propertyId}",
      propertyId.toString(),
    );
    const response = await axiosInterceptor.put(url, data);
    return response.data.data;
  },

  deleteProperty: async (propertyId: number): Promise<PropertyAndRoomType> => {
    const url = config.endpoints.properties.deleteProperty.replace(
      "{propertyId}",
      propertyId.toString(),
    );
    const response = await axiosInterceptor.delete(url);
    return response.data.data;
  },

  getRoomById: async (
    propertyId: number,
    roomId: number,
  ): Promise<RoomType> => {
    const url = config.endpoints.properties.getRoom
      .replace("{propertyId}", propertyId.toString())
      .replace("{roomId}", roomId.toString());
    const response = await axiosInterceptor.get(url);
    return response.data.data;
  },

  createRoom: async (propertyId: number, data: any): Promise<RoomType> => {
    const url = config.endpoints.properties.createRoom.replace(
      "{propertyId}",
      propertyId.toString(),
    );
    const response = await axiosInterceptor.post(url, data);
    return response.data.data;
  },

  updateRoom: async (
    propertyId: number,
    roomId: number,
    data: any,
  ): Promise<RoomType> => {
    const url = config.endpoints.properties.updateRoom
      .replace("{propertyId}", propertyId.toString())
      .replace("{roomId}", roomId.toString());
    const response = await axiosInterceptor.put(url, data);
    return response.data.data;
  },

  deleteRoom: async (propertyId: number, roomId: number): Promise<RoomType> => {
    const url = config.endpoints.properties.deleteRoom
      .replace("{propertyId}", propertyId.toString())
      .replace("{roomId}", roomId.toString());
    const response = await axiosInterceptor.delete(url);
    return response.data.data;
  },

  getAllCategory: async (): Promise<CategoryType[]> => {
    const response = await axiosInterceptor.get(
      config.endpoints.propertiesUtils.getAllCategories,
    );
    return response.data.data;
  },

  createCategory: async (data: any): Promise<CategoryType> => {
    const response = await axiosInterceptor.post(
      config.endpoints.propertiesUtils.createCategory,
      data,
    );
    return response.data.data;
  },

  updateCategory: async (
    categoryId: number,
    data: any,
  ): Promise<CategoryType> => {
    const url = config.endpoints.propertiesUtils.updateCategory.replace(
      "{categoryId}",
      categoryId.toString(),
    );
    const response = await axiosInterceptor.put(url, data);
    return response.data.data;
  },

  deleteCategory: async (categoryId: number): Promise<CategoryType> => {
    const url = config.endpoints.propertiesUtils.deleteCategory.replace(
      "{categoryId}",
      categoryId.toString(),
    );
    const response = await axiosInterceptor.delete(url);
    return response.data.data;
  },

  getAllCities: async (): Promise<string[]> => {
    const response = await axiosInterceptor.get(
      config.endpoints.propertiesUtils.getAllCities,
    );
    return response.data.data;
  },

  getAllImages: async (): Promise<string[]> => {
    const response = await axiosInterceptor.get(
      config.endpoints.propertiesUtils.getAllImages,
    );
    return response.data.data;
  },

  // Add other methods as needed (create, update, delete)
};

export default propertyService;
