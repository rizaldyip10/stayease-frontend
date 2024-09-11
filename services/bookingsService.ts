import {config} from "@/constants/url";
import {UserBookingsType} from "@/constants/Booking";
import axiosInterceptor from "@/services/authService";

export const getTenantBookings = async (token?: string) => {
    try {
        const { data } = await axiosInterceptor.get(config.endpoints.bookings.tenantBookings);
        return data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserBookings = async (query?: Partial<UserBookingsType>, token?: string) => {
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