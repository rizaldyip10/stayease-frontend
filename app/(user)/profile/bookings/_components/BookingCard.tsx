import React, {FC} from 'react';
import Image from "next/image";
import imageEx from "@/assets/images/template_property.jpg";
import Tag from "@/components/ui/tag";
import {Button} from "@/components/ui/button";
import {EllipsisVertical} from "lucide-react";
import {BookingDataType} from "@/constants/Booking";
import {currencyFormatter} from "@/utils/CurrencyFormatter";
import {dateFormater} from "@/utils/dateFormatter";

interface BookingCardProps {
    booking: BookingDataType;
}

const BookingCard: FC<BookingCardProps> = ({ booking }) => {
    return (
        <div className="w-full flex flex-col lg:flex-row gap-3 border border-gray-200 p-5 rounded-md">
            <Image src={imageEx} alt={"image"} height={120} className="h-32 object-cover rounded-md"/>
            <div className="w-full flex flex-col gap-2">
                <div className="w-full flex items-center justify-between">
                    <div className="w-full flex flex-col md:flex-row lg:flex-col xl:flex-row md:items-center lg:items-start xl:items-center gap-2">
                        <p className="text-xs text-blue-950 text-opacity-50">Booking ID: { booking.id }</p>
                        <Tag className="text-xs py-1 px-2 uppercase">{ booking.status }</Tag>
                    </div>
                    <Button
                        variant="ghost"
                        className="p-1 h-max"
                    >
                        <EllipsisVertical className="w-4 h-4"/>
                    </Button>
                </div>
                <div className="w-full flex flex-col xl:flex-row gap-3 lg:gap-1">
                    <div className="w-full xl:w-1/2 flex flex-col gap-2">
                        <h1 className="text-lg text-blue-950 font-semibold">{ booking.property.propertyName }</h1>
                        <p className="text-sm text-blue-950">{ currencyFormatter(booking.totalPrice) }</p>
                        <p className="text-sm text-blue-950 text-opacity-70">{ `${dateFormater(booking.checkInDate)} - ${dateFormater(booking.checkOutDate)}` }</p>
                    </div>
                    <div className="w-px h-full bg-gray-200 hidden lg:block"/>
                    <hr className="border-gray-200"/>
                    <div className="w-full xl:w-1/2 flex flex-col gap-2">
                        <h1>Room:</h1>
                        {
                            booking.bookingItems.map((bookingItem, i) => (
                                <p key={i}>{ bookingItem.room.name }</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;