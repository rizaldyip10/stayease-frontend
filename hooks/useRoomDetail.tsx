"use client";

import {useQuery} from "@tanstack/react-query";
import {getRoomDetail} from "@/services/propertyService";
import {RoomType} from "@/constants/Property";

export const useRoomDetail = (propertyId: number, roomId: number) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-room-detail"],
        queryFn: async () => await getRoomDetail(propertyId, roomId),
    });

    const room = data as RoomType;
    return { room, isLoading, error }
}