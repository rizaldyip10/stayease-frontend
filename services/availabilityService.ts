import { config } from "@/constants/url";
import axiosInterceptor from "@/utils/axiosInterceptor";

export interface TenantRoomAvailabilityType {
  id: number;
  name: string;
  propertySummary: {
    propertyId: number;
    propertyName: string;
    imageUrl: string;
  };
  roomAvailability: {
    id: number;
    startDate: Date;
    endDate: Date;
    isAvailable: boolean;
  }[];
}

export interface AvailabilityRequest {
  startDate: Date;
  endDate: Date;
}

export interface AvailabilityResponse {
  id: number;
  startDate: Date;
  endDate: Date;
  isAvailable: boolean;
}

export const availabilityService = {
  getTenantRoomAvailability: async (): Promise<
    TenantRoomAvailabilityType[]
  > => {
    try {
      const url = config.endpoints.availability.getTenantAvailability;
      const response = await axiosInterceptor.get(url);
      return await response.data.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  setAvailability: async (
    roomId: number,
    data: AvailabilityRequest,
  ): Promise<AvailabilityResponse> => {
    try {
      const url = config.endpoints.availability.baseRoute;
      const response = await axiosInterceptor.post(
        url,
        { data },
        {
          params: { roomId },
        },
      );
      return await response.data.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  removeAvailability: async (
    roomId: number,
    availabilityId: number,
  ): Promise<string> => {
    try {
      const url = config.endpoints.availability.baseRoute;
      const response = await axiosInterceptor.delete(url, {
        params: { roomId, availabilityId },
      });
      return await response.data.statusMessage;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
