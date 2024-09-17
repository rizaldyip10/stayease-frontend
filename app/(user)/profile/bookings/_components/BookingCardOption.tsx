"use client";

import React, { FC } from "react";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadProofDialog from "@/components/UploadProofDialog";
import CancelBookingDialog from "@/app/(user)/profile/bookings/_components/CancelBookingDialog";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useRouter} from "next/navigation";

interface BookingCardOptionsProps {
    bookingId: string;
    status: string;
}

const BookingCardOption: FC<BookingCardOptionsProps> = ({ bookingId, status }) => {
    const router = useRouter();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="p-1 h-max"
                >
                    <EllipsisVertical className="w-4 h-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                    {status === "pending" && (
                        <>
                            <CancelBookingDialog bookingId={bookingId} />
                            <UploadProofDialog bookingId={bookingId} />
                        </>
                    )}
                    <Button
                        className="w-full justify-start text-blue-950"
                        variant="ghost"
                        onClick={() => router.push(`/profile/bookings/${bookingId}`)}
                    >
                        View detail
                    </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default BookingCardOption;