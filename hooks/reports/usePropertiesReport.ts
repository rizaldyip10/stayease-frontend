import {useQuery} from "@tanstack/react-query";
import {reportService} from "@/services/reportService";
import {PropertiesSelectType, ReportsQueryType} from "@/constants/Reports";
import propertyService from "@/services/propertyService";

const useDailySales = (query?: Partial<ReportsQueryType>) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-daily-sales", query],
        queryFn: async () => {
            const rawData = await reportService.getDailySales(query);

            // Transform the date format
            return rawData.map(item => ({
                ...item,
                date: new Date(item.date).getDate().toString()
            }));
        },
        enabled: !!query
    });

    return {
        dailySales: data,
        dailySalesIsLoading: isLoading,
        dailySalesError: error
    };
}

const usePopularRooms = () => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-popular-rooms"],
        queryFn: async () => await reportService.getPopularRoom()
    });


    return {
        popularRooms: data,
        popularRoomsIsLoading: isLoading,
        popularRoomsError: error
    };
};

const usePropertiesSales = (query?: Partial<ReportsQueryType>) => {
    const{
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-properties-sales", query],
        queryFn: async () => await reportService.getPropertiesSales(query),
        enabled: !!query
    });

    return {
        propertiesSales: data,
        propertiesSalesIsLoading: isLoading,
        propertiesSalesError: error
    };
};

const usePropertiesSelect = () => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-properties-select"],
        queryFn: async () => await propertyService.getTenantProperties()
    });

    const propertyList = data as unknown as PropertiesSelectType[];
    return {
        propertyList,
        isLoading,
        error
    };
}

export { useDailySales ,usePopularRooms, usePropertiesSelect, usePropertiesSales }