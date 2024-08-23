import {useState} from "react";
import {BookingValueType} from "@/constants/Booking";

export const useBookingValues = () => {
    const [bookingValues, setBookingValues] = useState<BookingValueType>();

    return {
        bookingValues,
        setBookingValues,
    }
}