import {useQuery} from "@tanstack/react-query";
import {getPaymentInfo} from "@/services/paymentService";
import {PaymentType} from "@/constants/Payment";

export const usePaymentInfo = (bookingId: string) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-payment-info"],
        queryFn: async () => getPaymentInfo(bookingId),
    });

    return { paymentInfo: data as PaymentType, isLoading, error }
}