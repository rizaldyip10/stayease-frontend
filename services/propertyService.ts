import { config } from "@/constants/url";
import axiosInterceptor from "@/utils/axiosInterceptor";
import {
  AdjustedRatesType,
  CategoryType,
  CurrentAvailablePropertyType,
  LowestDailyRateType,
  PropertyAndRoomType,
  PropertyListingType,
  RoomType,
} from "@/constants/Property";
import { format } from "date-fns";

const formatDate = (date: Date): string => format(date, "yyyy-MM-dd");

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

  getTenantProperties: async (): Promise<PropertyAndRoomType> => {
    const response = await axiosInterceptor.get(
      config.endpoints.properties.getTenantProperties,
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
    const url = config.endpoints.propertyUtils.getRoom
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
      config.endpoints.propertyUtils.getAllCategories,
    );
    return response.data.data;
  },

  createCategory: async (data: any): Promise<CategoryType> => {
    const response = await axiosInterceptor.post(
      config.endpoints.properties.createCategory,
      data,
    );
    return response.data.data;
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

  getAdjustedRates: async ({
    propertyId,
    date,
  }: {
    propertyId: number;
    date: Date;
  }): Promise<AdjustedRatesType> => {
    const url = config.endpoints.propertyUtils.getAdjustedRates.replace(
      "{propertyId}",
      propertyId.toString(),
    );
    const response = await axiosInterceptor.get(url, {
      params: { date: formatDate(date) },
    });
    return response.data.data;
  },

  getCurrentAvailableProperty: async ({
    propertyId,
    date,
  }: {
    propertyId: number;
    date: Date;
  }): Promise<CurrentAvailablePropertyType> => {
    const url =
      config.endpoints.propertyUtils.getCurrentAvailableProperty.replace(
        "{propertyId}",
        propertyId.toString(),
      );
    const response = await axiosInterceptor.get(url, {
      params: { date: formatDate(date) },
    });
    return response.data.data;
  },

  getCurrentRoom: async (
    propertyId: number,
    roomId: number,
    date: Date,
  ): Promise<AdjustedRatesType> => {
    const url = config.endpoints.propertyUtils.getCurrentRoom
      .replace("{propertyId}", propertyId.toString())
      .replace("{roomId}", roomId.toString());
    const response = await axiosInterceptor.get(url, {
      params: { date: formatDate(date) },
    });
    return response.data.data;
  },

  getLowestDailyRate: async (
    propertyId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<LowestDailyRateType[]> => {
    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");
    const url = config.endpoints.propertyUtils.getLowestDailyRate.replace(
      "{propertyId}",
      propertyId.toString(),
    );
    const response = await axiosInterceptor.get(url, {
      params: { startDate: formattedStartDate, endDate: formattedEndDate },
    });
    return response.data.data;
  },

  getLowestDailyCumulativeRate: async (
    propertyId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<LowestDailyRateType[]> => {
    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");
    const url =
      config.endpoints.propertyUtils.getLowestDailyCumulativeRate.replace(
        "{propertyId}",
        propertyId.toString(),
      );
    const response = await axiosInterceptor.get(url, {
      params: { startDate: formattedStartDate, endDate: formattedEndDate },
    });
    return response.data.data;
  },

  sortAndFilter: async (
    startDate?: Date,
    endDate?: Date,
    city?: string,
    categoryId?: number,
    page?: number,
    size?: number,
    sortBy?: string,
    sortDirection?: string,
    searchTerm?: string,
  ): Promise<PropertyListingType> => {
    let formattedStartDate;
    let formattedEndDate;
    startDate
      ? (formattedStartDate = format(startDate, "yyyy-MM-dd"))
      : startDate;
    endDate ? (formattedEndDate = format(endDate, "yyyy-MM-dd")) : endDate;
    const url = `${config.endpoints.propertyListings.sortAndFilter}?startDate=${formattedStartDate}&endDate=${formattedEndDate}&city=${city}&categoryId=${categoryId}&page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}&searchTerm=${searchTerm}`;
    const response = await axiosInterceptor.get(url);
    return response.data.data;
  },

  // Add other methods as needed (create, update, delete)
};

export default propertyService;
