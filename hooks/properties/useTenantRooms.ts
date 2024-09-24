import {useQuery} from "@tanstack/react-query";
import propertyService from "@/services/propertyService";

export const useTenantRooms = () => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-tenant-rooms"],
        queryFn: async () => await propertyService.getTenantRooms()
    });

    return {
        rooms: data,
        isLoading,
        error
    }
}