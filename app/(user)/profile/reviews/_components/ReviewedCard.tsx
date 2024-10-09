"use client";

import imageEx from "@/assets/images/template_property.jpg";
import Image from "next/image";
import ReviewSection from "@/components/formik/ReviewSection";
import {Button} from "@/components/ui/button";
import {PencilLine} from "lucide-react";
import {FC, useState} from "react";
import {ReviewType} from "@/constants/Review";
import {dateFormater} from "@/utils/dateFormatter";
import {currencyFormatter} from "@/utils/CurrencyFormatter";

interface ReviewedCardProps {
    review: ReviewType;
}

const ReviewedCard: FC<ReviewedCardProps> = ({ review }) => {
    const {id, isPublished, booking, user, rating, comment} = review;
    const [isEditState, setEditState] = useState<boolean>(!isPublished);
    return (
        <div className="w-full flex flex-col lg:flex-row gap-3 border border-gray-200 p-5 rounded-md">
            <Image src={booking.propertyImage} alt={"image"} height={120} className="h-32 object-cover rounded-md" />
            <div className="w-full flex flex-col gap-2">
                <div className="w-full flex items-center justify-between">
                    <p className="text-xs text-blue-950 text-opacity-50">Booking ID: {booking.id}</p>
                    <Button
                        variant="ghost"
                        className="p-1 h-max"
                        onClick={() => setEditState(!isEditState)}
                    >
                        <PencilLine className="w-4 h-4" />
                    </Button>
                </div>
                <div className="w-full flex flex-col xl:flex-row gap-3 lg:gap-1">
                    <div className="w-full xl:w-1/2 flex flex-col gap-2">
                        <h1 className="text-lg text-blue-950 font-semibold">{booking.propertyName}</h1>
                        <p className="text-sm text-blue-950">{currencyFormatter(booking.totalPrice)}</p>
                        <p className="text-sm text-blue-950 text-opacity-70">{dateFormater(booking.checkInDate)} - {dateFormater(booking.checkOutDate)}</p>
                    </div>
                    <div className="w-px h-full bg-gray-200 hidden lg:block" />
                    <hr className="border-gray-200" />
                    <ReviewSection isEditState={isEditState} comment={comment} rating={rating} />
                </div>
            </div>
        </div>
    );
};

export default ReviewedCard;