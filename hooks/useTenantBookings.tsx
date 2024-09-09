"use client";

import {useQuery} from "@tanstack/react-query";
import {getTenantBookings} from "@/services/bookingsService";

export const useTenantBookings = () => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-tenant-bookings"],
        queryFn: async () => await getTenantBookings()
        }
    );

    return {
        bookings: data,
        isLoading,
        error
    }
};