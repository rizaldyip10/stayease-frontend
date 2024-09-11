import axiosInterceptor from "@/services/authService";
import {config} from "@/constants/url";

export const getPaymentInfo = async (bookingId: string) => {
    try {
        const { data } = await axiosInterceptor.get(`${config.endpoints.payments.paymentInfo}/${bookingId}`);
        return data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}