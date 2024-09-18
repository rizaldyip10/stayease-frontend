import {useQuery} from "@tanstack/react-query";
import propertyService from "@/services/propertyService";

export const useTenantProperties = () => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-tenant-properties"],
        queryFn: async () => await propertyService.getTenantProperties()
    });

    return {
        properties: data,
        isLoading,
        error
    };
};