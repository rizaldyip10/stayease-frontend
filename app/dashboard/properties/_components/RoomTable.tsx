"use client";

import TableHeaders from "@/app/dashboard/properties/_components/TableHeaders";
import DataTable from "@/components/ui/data-table";
import { RoomColumns } from "@/app/dashboard/properties/_components/RoomTableColumn";
import { useTenantRooms } from "@/hooks/properties/useTenantRooms";
import GlobalLoading from "@/components/GlobalLoading";
import React from "react";

const RoomTable = () => {
  const { rooms, isLoading, error } = useTenantRooms();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center align-middle h-[200px]">
        <GlobalLoading height={100} width={100} />
      </div>
    );
  }

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
