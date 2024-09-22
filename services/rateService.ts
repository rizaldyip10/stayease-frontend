import axiosInterceptor from "@/utils/axiosInterceptor";
import { config } from "@/constants/url";
import { AdjustedRatesType, LowestDailyRateType } from "@/constants/Property";
import { format } from "date-fns";
import { formatDate } from "@/utils/dateFormatter";

export interface RateResponse {
  rateId: number;
  startDate: Date;
  endDate: Date;
  adjustmentRate: number;
  adjustmentType: string;
  validFrom: Date;
  propertySummary: {
    propertyId: number;
    propertyName: string;
  };
}

export interface RateRequest {
  startDate: Date;
  endDate: Date;
  adjustmentRate: number;
  adjustmentType: string;
}

const rateService = {
  getTenantRates: async () => {
    try {
      const response = await axiosInterceptor.get(
        config.endpoints.rates.baseRoute,
      );
      return response.data.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  getAdjustedRates: async ({
    propertyId,
    date,
  }: {
    propertyId: number;
    date: Date;
  }): Promise<AdjustedRatesType> => {
    const url = config.endpoints.rates.baseRoute;
    try {
      const response = await axiosInterceptor.get(url, {
        params: {
          propertyId: propertyId,
          date: formatDate(date),
        },
      });
      return response.data.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  getLowestDailyRate: async (
    propertyId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<LowestDailyRateType[]> => {
    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");
    const url = config.endpoints.rates.getLowestDailyRate;
    try {
      const response = await axiosInterceptor.get(url, {
        params: {
          propertyId: propertyId,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      });
      return response.data.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  getLowestDailyCumulativeRate: async (
    propertyId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<LowestDailyRateType[]> => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const url = config.endpoints.propertyUtils.getLowestDailyCumulativeRate;
    try {
      const response = await axiosInterceptor.get(url, {
        params: {
          propertyId: propertyId,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      });
      return response.data.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  setRate: async (
    propertyId: number,
    values: RateRequest,
  ): Promise<RateResponse> => {
    try {
      const response = await axiosInterceptor.post(
        config.endpoints.rates.baseRoute,
        {
          values,
        },
        { params: { propertyId } },
      );
      return response.data.data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  updateRate: async (
    rateId: number,
    values: RateRequest,
  ): Promise<RateResponse> => {
    try {
      const response = await axiosInterceptor.put(
        `${config.endpoints.rates.baseRoute}/${rateId}`,
        {
          values,
        },
      );
      return response.data.data;
    } catch (error: any) {
      return error.response.data;
    }
  },
};

export default rateService;
