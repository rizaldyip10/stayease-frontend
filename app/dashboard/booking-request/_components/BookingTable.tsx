"use client";

import {useTenantBookings} from "@/hooks/transactions/useTenantBookings";
import {columns} from "@/app/dashboard/booking-request/_components/BookingTableColumns";
import DataTable from "@/components/ui/data-table";

const BookingTable = () => {
    const { bookings, isLoading, error } = useTenantBookings();

    return (
        <DataTable
            data={bookings ?? []}
            columns={columns}
            isLoading={isLoading}
            filterColumn={"user"}
        />
    );
};

export default BookingTable;