import {useQuery} from "@tanstack/react-query";
import {reportService} from "@/services/reportService";
import {ReportsQueryType} from "@/constants/Reports";

const useDailySales = (query?: Partial<ReportsQueryType>) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-daily-sales"],
        queryFn: async () => {
            const rawData = await reportService.getDailySales(query);

            // Transform the date format
            return rawData.map(item => ({
                ...item,
                date: new Date(item.date).getDate().toString()
            }));
        }
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

export { useDailySales ,usePopularRooms }