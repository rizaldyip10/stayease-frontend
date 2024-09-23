import {RoomAvailabilityType} from "@/constants/Property";
import axiosInterceptor from "@/utils/axiosInterceptor";
import {config} from "@/constants/url";

export const reportService = {
    getRoomAvailability: async (): Promise<RoomAvailabilityType[]> => {
        try {
            const {data} = await axiosInterceptor.get(config.endpoints.reports.availabilityReports);
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}