import {config} from "@/constants/url";
import axiosInterceptor from "@/utils/axiosInterceptor";

export const paymentService = {
    getPaymentInfo: async (bookingId: string) => {
        try {
            const { data } = await axiosInterceptor.get(`${config.endpoints.payments.paymentInfo}/${bookingId}`);
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    uploadPayment: async (bookingId: string, value: any, token?: string) => {
        try {
            await axiosInterceptor.post(`${config.endpoints.payments.uploadPayment}/${bookingId}`, value, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
