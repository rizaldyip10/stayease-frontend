import {useQuery} from "@tanstack/react-query";
import {PaymentType} from "@/constants/Payment";
import {paymentService} from "@/services/paymentService";

export const usePaymentInfo = (bookingId: string) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-payment-info"],
        queryFn: async () => paymentService.getPaymentInfo(bookingId),
    });

    return { paymentInfo: data as PaymentType, isLoading, error }
}