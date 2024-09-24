"use client";

import TableHeaders from "@/app/dashboard/properties/_components/TableHeaders";
import DataTable from "@/components/ui/data-table";
import {RoomColumns} from "@/app/dashboard/properties/_components/RoomTableColumn";
import {useTenantRooms} from "@/hooks/properties/useTenantRooms";

const RoomTable = () => {
    const { rooms, isLoading, error } = useTenantRooms();

    return (
        <DataTable
            data={rooms ?? []}
            columns={RoomColumns}
            isLoading={isLoading}
            filterColumn="name"
            CustomFilterComponent={TableHeaders}
        />
    );
};

export default RoomTable;