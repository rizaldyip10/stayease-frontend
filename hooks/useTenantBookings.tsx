"use client";

import {useQuery} from "@tanstack/react-query";

const useTenantBookings = () => {
    const {

    } = useQuery({
        queryKey: ["get-tenant-bookings"],
        queryFn:
        }
    );
};