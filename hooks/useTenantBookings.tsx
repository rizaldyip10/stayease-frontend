"use client";

import {useQuery} from "@tanstack/react-query";
import {bookingsService} from "@/services/bookingsService";

export const useTenantBookings = () => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-tenant-bookings"],
        queryFn: async () => await bookingsService.getTenantBookings(),
        }
    );

    return {
        bookings: data,
        isLoading,
        error
    }
};