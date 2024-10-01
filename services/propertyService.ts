import { config } from "@/constants/url";
import axiosInterceptor from "@/utils/axiosInterceptor";
import {
  RoomWithAdjustedRatesType,
  AvailablePropertyType,
  CategoryType,
  CurrentAvailablePropertyType,
  PropertyAndRoomType,
  PropertyListingType,
  RoomType,
} from "@/constants/Property";
import { format } from "date-fns";
import { formatDate } from "@/utils/dateFormatter";
import logger from "@/utils/logger";

const propertyService = {
  getAllProperties: async (): Promise<PropertyAndRoomType[]> => {
    const response = await axiosInterceptor.get(
      config.endpoints.propertyUtils.getAllProperties,
    );
    return response.data.data;
  },

  getPropertyById: async (propertyId: number): Promise<PropertyAndRoomType> => {
    const url = config.endpoints.propertyUtils.getProperty.replace(
      "{propertyId}",
      propertyId.toString(),
    );
    console.log("Type of propertyId:", typeof propertyId);
    const response = await axiosInterceptor.get(url);
    return response.data.data;
  },

  getRoomsByPropertyId: async (propertyId: number): Promise<RoomType[]> => {
    const url = config.endpoints.propertyUtils.getRooms.replace(
      "{propertyId}",
      propertyId.toString(),
    );
    const response = await axiosInterceptor.get(url);
    return response.data.data;
  },

  getTenantProperties: async (): Promise<PropertyAndRoomType[]> => {
    try {
      const response = await axiosInterceptor.get(
        config.endpoints.properties.getTenantProperties,
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response.status === 404) {
        return [];
      }
      logger.error(
        "Failed to fetch tenant properties:",
        error.response.data.message,
      );
      throw error;
    }
  },

  getTenantRooms: async (): Promise<RoomType[]> => {
    try {
      const response = await axiosInterceptor.get(
        config.endpoints.properties.getTenantRooms,
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response.status === 404) {
        return [];
      }
      logger.error(
        "Failed to fetch tenant rooms:",
        error.response.data.message,
      );
      throw error;
    }
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

  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);
    const url = config.endpoints.properties.uploadImage;
    const response = await axiosInterceptor.post(url, formData);
    return response.data.data.imageUrl;
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
    try {
      const url = config.endpoints.propertyUtils.getRoom
        .replace("{propertyId}", propertyId.toString())
        .replace("{roomId}", roomId.toString());
      const response = await axiosInterceptor.get(url);
      return response.data.data;
    } catch (error: any) {
      if (error.response.status === 404) {
        return {
          id: 0,
          name: "",
          description: "",
          capacity: 0,
          basePrice: 0,
          imageUrl: "",
          propertySummary: { propertyId: 0, propertyName: "" },
        };
      }
      logger.error("Failed to fetch room:", error.response.data.message);
      throw error;
    }
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

  createCategory: async (data: any): Promise<CategoryType> => {
    try {
      const response = await axiosInterceptor.post(
        config.endpoints.properties.createCategory,
        data,
      );
      return response.data.data;
    } catch (error: any) {
      console.error(
        "Failed to create new category:",
        error.response.data.message,
      );
      throw error;
    }
  },

  updateCategory: async (
    categoryId: number,
    data: any,
  ): Promise<CategoryType> => {
    const url = config.endpoints.properties.updateCategory.replace(
      "{categoryId}",
      categoryId.toString(),
    );
    const response = await axiosInterceptor.put(url, data);
    return response.data.data;
  },

  deleteCategory: async (categoryId: number): Promise<CategoryType> => {
    const url = config.endpoints.properties.deleteCategory.replace(
      "{categoryId}",
      categoryId.toString(),
    );
    const response = await axiosInterceptor.delete(url);
    return response.data.data;
  },

  checkPropertyOwnership: async (propertyId: number): Promise<boolean> => {
    const url = config.endpoints.propertyUtils.checkPropertyOwnership.replace(
      "{propertyId}",
      propertyId.toString(),
    );
    const response = await axiosInterceptor.get(url);
    return response.data.data;
  },

  getCurrentAvailableProperty: async ({
    propertyId,
    date,
  }: {
    propertyId: number;
    date: Date;
  }): Promise<CurrentAvailablePropertyType> => {
    try {
      const url =
        config.endpoints.propertyUtils.getCurrentAvailableProperty.replace(
          "{propertyId}",
          propertyId.toString(),
        );
      const response = await axiosInterceptor.get(url, {
        params: { date: formatDate(date) },
      });
      return response.data.data;
    } catch (error: any) {
      if (error.response.status === 404) {
        return {
          id: 0,
          tenant: "",
          category: "",
          propertyName: "",
          description: "",
          imageUrl: "",
          address: "",
          city: "",
          country: "",
          latitude: 0,
          longitude: 0,
          rooms: [],
          unavailableRooms: [],
        };
      }
      logger.error(
        "Failed to fetch current available property:",
        error.response.data.message,
      );
      throw error;
    }
  },

  getCurrentRoom: async (
    propertyId: number,
    roomId: number,
    date: Date,
  ): Promise<RoomWithAdjustedRatesType> => {
    try {
      const url = config.endpoints.propertyUtils.getCurrentRoom
        .replace("{propertyId}", propertyId.toString())
        .replace("{roomId}", roomId.toString());
      const response = await axiosInterceptor.get(url, {
        params: { date: formatDate(date) },
      });
      return response.data.data;
    } catch (error: any) {
      if (error.response.status === 404) {
        return {
          propertyId: 0,
          propertyName: "",
          roomId: 0,
          roomName: "",
          imageUrl: "",
          roomCapacity: 0,
          roomDescription: "",
          basePrice: 0,
          adjustedPrice: 0,
          date: new Date(),
          isAvailable: false,
        };
      }
      logger.error("Failed to fetch room:", error.response.data.message);
      throw error;
    }
  },

  sortAndFilter: async (
    startDate?: Date,
    endDate?: Date,
    city?: string,
    categoryId?: number,
    searchTerm?: string,
    minPrice?: number,
    maxPrice?: number,
    page?: number,
    size?: number,
    sortBy?: string,
    sortDirection?: string,
  ): Promise<PropertyListingType> => {
    const formattedStartDate = startDate ? formatDate(startDate) : undefined;
    const formattedEndDate = endDate ? formatDate(endDate) : undefined;
    const formattedCity = city ? city.replace(/ /g, "%") : undefined;
    const formattedSearchTerm = searchTerm
      ? searchTerm.replace(/ /g, "%")
      : undefined;
    const url = config.endpoints.propertyListings.sortAndFilter;
    try {
      const response = await axiosInterceptor.get(url, {
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          city: formattedCity,
          categoryId,
          searchTerm: formattedSearchTerm,
          minPrice,
          maxPrice,
          page,
          size,
          sortBy,
          sortDirection,
        },
      });
      return response.data.data;
    } catch (error: any) {
      if (error.response.status === 404) {
        return {
          totalPages: 0,
          currentPage: 0,
          totalElements: 0,
          content: [],
        };
      }
      logger.error("Failed to fetch properties:", error.response.data.message);
      throw error;
    }
  },

  getAllAvailablePropertiesOnDate: async (
    date: Date,
  ): Promise<AvailablePropertyType> => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const url =
      config.endpoints.propertyListings.getAllAvailablePropertiesOnDate;
    const response = await axiosInterceptor.get(url, {
      params: { date: formattedDate },
    });
    return response.data.data;
  },

  getAllCategories: async (): Promise<CategoryType[]> => {
    try {
      const response = await axiosInterceptor.get(
        config.endpoints.propertyListings.getAllCategories,
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response.status === 404) {
        return [];
      }
      logger.error("Failed to fetch categories:", error.response.data.message);
      throw error;
    }
  },

  getAllCities: async (): Promise<string[]> => {
    try {
      const response = await axiosInterceptor.get(
        config.endpoints.propertyListings.getAllCities,
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response.status === 404) {
        return [];
      }
      logger.error("Failed to fetch cities:", error.response.data.message);
      throw error;
    }
  },

  getAllImages: async (): Promise<string[]> => {
    try {
      const response = await axiosInterceptor.get(
        config.endpoints.propertyListings.getAllImages,
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response.status === 404) {
        return [];
      }
      logger.error("Failed to fetch images:", error.response.data.message);
      throw error;
    }
  },
};

export default propertyService;
