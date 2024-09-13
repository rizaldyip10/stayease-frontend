import {useInfiniteQuery} from "@tanstack/react-query";
import {UserBookingsType} from "@/constants/Booking";
import {bookingsService} from "@/services/bookingsService";

export const useUserBookingList = (filters?: Partial<UserBookingsType>) => {
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['get-user-bookings', filters],
        queryFn: async ({ pageParam }) => {
            const response = await bookingsService.getUserBookings({...filters, page: pageParam});
            return {
                bookings: response.content,
                totalPages: response.totalPages,
                totalElements: response.totalElements,
                currentPage: response.pageable.pageNumber
            }
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPages - 1) {
                return lastPage.currentPage + 1
            }
            return undefined;
        },
        initialPageParam: 0,
        enabled: !!filters
    });

    return {
        bookings: data?.pages.flatMap((page) => page.bookings),
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    }
}