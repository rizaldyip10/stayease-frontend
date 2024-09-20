import {config} from "@/constants/url";
import {UserBookingsType} from "@/constants/Booking";
import axiosInterceptor from "@/utils/axiosInterceptor";

export const bookingsService = {
    getTenantBookings: async () => {
        try {
            const { data } = await axiosInterceptor.get(config.endpoints.bookings.tenantBookings);
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getUserBookings: async (query?: Partial<UserBookingsType>) => {
        try {
            const { data } = await axiosInterceptor.get(config.endpoints.bookings.userBookings, {
                params: query,
            });
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};
