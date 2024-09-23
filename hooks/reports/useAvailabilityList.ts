"use client";

import {useQuery} from "@tanstack/react-query";
import {reportService} from "@/services/reportService";

export const useAvailabilityList = () => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-availability-list"],
        queryFn: async () => await reportService.getRoomAvailability()
    });

    return { availableList: data, isLoading, error }
}