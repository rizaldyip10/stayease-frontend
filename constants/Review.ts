type UserReviewSummary = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
};

type BookingReviewSummary = {
    id: string;
    propertyName: string;
    propertyImage: string;
    totalPrice: number;
    checkInDate: string;
    checkOutDate: string;
};

export type ReviewType = {
    id: number;
    comment: string | null | undefined;
    rating: number | null | undefined;
    user: UserReviewSummary
    booking: BookingReviewSummary;
    isPublished: boolean;
};

export type PropertyRatingType = {
    propertyName: string;
    avgRating: number;
    totalReviewers: number;
};

export type ReviewsParamsType = {
    page: number | null;
    size: number | null;
    sortBy: string | null;
    direction: string | null;
    search: string | null;
};

export type ReviewsInputType = {
    comment: string;
    rating: number;
};