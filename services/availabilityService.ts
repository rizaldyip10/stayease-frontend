import { config } from "@/constants/url";
import axiosInterceptor from "@/utils/axiosInterceptor";
import { formatDate } from "@/utils/dateFormatter";
import logger from "@/utils/logger";

export interface TenantRoomAvailabilityType {
  id: number;
  name: string;
  propertySummary: {
    propertyId: number;
    propertyName: string;
    imageUrl: string;
  };
  roomAvailability: AvailabilityResponse[];
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
  isManual: boolean;
  roomId: number;
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
      logger.info("Setting availability for room", { id: roomId, data });
      const url = config.endpoints.availability.baseRoute;
      const response = await axiosInterceptor.post(
        url,
        {
          startDate: formatDate(data.startDate),
          endDate: formatDate(data.endDate),
        },
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
      logger.info("Availability removed", { roomId, availabilityId });
      return await response.data.statusMessage;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
