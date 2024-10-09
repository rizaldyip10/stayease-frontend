"use client";

import ReviewedCard from "@/app/(user)/profile/reviews/_components/ReviewedCard";
import NoResultsFound from "@/components/NoResultsFound";
import ReviewsFilter from "@/app/(user)/profile/reviews/_components/ReviewsFilter";
import {useUserReviews} from "@/hooks/reviews/useReviews";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

const ReviewList = () => {
    const {
        userReviews,
        isLoading,
        error,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useUserReviews();

    if (isLoading) return <>Loading...</>
    if (error) return <>Something went wrong</>;

    return (
        <div className="grid grid-cols-1 gap-2">
            <ReviewsFilter />
            {
                !userReviews || userReviews.length === 0 &&
                    <NoResultsFound />
            }
            {
                userReviews.length > 0 &&
                    userReviews.map((review, i) => (
                        <ReviewedCard key={i} review={review} />
                    ))
            }
            {
                hasNextPage &&
                    <Button
                        onClick={() => fetchNextPage()}
                        variant="outline"
                        className="border-blue-950 text-blue-950"
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? <Loader2 className="w-10 h-10 text-blue-950 animate-spin" /> : null} Show more
                    </Button>
            }
        </div>
    );
};

export default ReviewList;