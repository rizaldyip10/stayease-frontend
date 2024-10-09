"use client";

import {useInfiniteQuery} from "@tanstack/react-query";
import {reviewService} from "@/services/reviewService";
import {ReviewsParamsType, ReviewType} from "@/constants/Review";

const useUserReviews = (query?: Partial<ReviewsParamsType>) => {
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
       queryKey: ["get-user-reviews", query],
       queryFn: async ({pageParam}) => {
           const response = await reviewService.getUserReviews({...query, page: pageParam});
           return {
               bookings: response.content,
               totalPages: response.totalPages,
               totalElements: response.totalElements,
               currentPage: response.pageable.pageNumber
           }},
       getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPages - 1) {
                return lastPage.currentPage + 1
            }
            return undefined;
       },
       initialPageParam: 0,
       enabled: !!query
    });

    return {
        userReviews: data?.pages.flatMap((page) => page.bookings) as unknown as ReviewType[],
        isLoading: isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    };
};

export { useUserReviews };