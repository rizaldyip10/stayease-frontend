"use client";

import {useQuery} from "@tanstack/react-query";
import {reportService} from "@/services/reportService";

export const useUserStats = () => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-user-stats"],
        queryFn: async () => reportService.getUserStats()
    });

    return {
        userStats: data,
        isLoading,
        error
    }
}