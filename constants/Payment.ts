import {BookingType} from "@/constants/Booking";

export type Payment = {
    amount: number;
    bankVa: string;
    paymentExpirationAt: string;
    booking: BookingType;
};