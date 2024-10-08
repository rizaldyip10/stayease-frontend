"use client";

import { useQuery } from "@tanstack/react-query";
import { RoomType } from "@/constants/Property";
import propertyService from "@/services/propertyService";

export const useRoomDetail = (propertyId: number, roomId: number) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-room-detail"],
        queryFn: async () => await propertyService.getRoomById(propertyId, roomId),
    });

    const room = data as RoomType;
    return { room, isLoading, error }
}