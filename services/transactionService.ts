import {config} from "@/constants/url";
import axiosInterceptor from "@/utils/axiosInterceptor";

export const transactionService = {
    newReservation: async (value: any, roomId: number, token?: string) => {
        try {
            const { data } = await axiosInterceptor.post(`/transactions/${roomId}`, value, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    tenantApproveTrx: async (bookingId: string, token?: string) => {
        try {
            const { data } = await axiosInterceptor.patch(`${config.endpoints.transactions.tenant}/${bookingId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    tenantRejectTrx: async (bookingId: string, token?: string) => {
        try {
            const { data } = await axiosInterceptor.patch(`${config.endpoints.transactions.tenant}/${bookingId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};