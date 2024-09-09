import axiosInterceptor from "@/utils/axiosInterceptor";
import {config} from "@/constants/url";

export const getTenantBookings = async (token?: string) => {
    try {
        const { data } = await axiosInterceptor.get(config.endpoints.bookings.tenantBookings,);

        return data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}