"use client";

import {Input} from "@/components/ui/input";
import DatePicker from "@/components/DatePicker";
import BookingCard from "@/app/(user)/profile/bookings/_components/BookingCard";
import {useUserBookingList} from "@/hooks/transactions/useUserBookingList";
import {useUserBookingsFilter} from "@/hooks/transactions/useUserBookingsFilter";
import {Button} from "@/components/ui/button";

const BookingList = () => {
    const { queries } = useUserBookingsFilter();
    const {
        bookings,
        isLoading,
        error,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage } = useUserBookingList(queries);

    return (
        <div className="w-full grid grid-cols-1 gap-2">
            <div className="w-full flex flex-col xl:flex-row md:items-start xl:items-center justify-between gap-2">
                <Input placeholder="Search your bookings" className="w-full xl:max-w-96" />
                <div className="w-full xl:w-max flex flex-col md:flex-row gap-2 items-center">
                    <DatePicker name="checkInDate" label="Select check-in date" onChange={() => ("")} isEditing className="w-full xl:max-w-96" />
                    <DatePicker name="checkOutDate" label="Select check-out date" onChange={() => ("")} isEditing className="w-full xl:max-w-96" />
                </div>
            </div>
            { isLoading &&  <>Loading...</> }
            { error && <>Oops... Something went wrong, failed to fetch your booking list</> }
            {
                bookings?.map((booking, i) => (
                    <BookingCard key={i} booking={booking} />
                ))
            }
            {
                hasNextPage &&
                    <Button
                        variant="outline"
                        className="border-blue-950 text-blue-950"
                        onClick={() => fetchNextPage()}
                    >
                        Load more
                    </Button>
            }
            { isFetchingNextPage && <>Loading...</> }
        </div>
    );
};

export default BookingList;