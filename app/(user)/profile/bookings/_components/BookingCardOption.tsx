"use client";

import {Select, SelectContent, SelectTrigger} from "@/components/ui/select";
import {EllipsisVertical} from "lucide-react";
import {Button} from "@/components/ui/button";
import {FC} from "react";
import UploadProofDialog from "@/components/UploadProofDialog";
import CancelBookingDialog from "@/app/(user)/profile/bookings/_components/CancelBookingDialog";

interface BookingCardOptionsProps {
    bookingId: string;
    status: string;
}

const BookingCardOption: FC<BookingCardOptionsProps> = ({ bookingId, status }) => {
    return (
        <Select>
            <SelectTrigger asChild>
                <Button
                    variant="ghost"
                    className="p-1 h-max"
                >
                    <EllipsisVertical className="w-4 h-4"/>
                </Button>
            </SelectTrigger>
            <SelectContent>
                {
                    status === "pending" &&
                        <div className="w-full text-sm">
                            <CancelBookingDialog bookingId={bookingId} />
                            <UploadProofDialog bookingId={bookingId} />
                        </div>
                }
                <Button>
                    View detail
                </Button>
            </SelectContent>
        </Select>
    );
};

export default BookingCardOption;