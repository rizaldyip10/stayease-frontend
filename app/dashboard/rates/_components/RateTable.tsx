"use client";

import RateTableHeader from "@/app/dashboard/rates/_components/RateTableHeader";
import DataTable from "@/components/ui/data-table";
import { RateResponseType } from "@/constants/Rates";
import { RateColumns } from "@/app/dashboard/rates/_components/RateTableColumn";
import React from "react";
import { AutoRateColumns } from "@/app/dashboard/rates/_components/AutoRateTableColumn";

interface RateTableProps {
  rates: RateResponseType[];
  isLoading: boolean;
  isManualRate: boolean;
}

const RateTable: React.FC<RateTableProps> = ({
  rates,
  isLoading,
  isManualRate,
}) => {
  return (
    <DataTable
      data={rates ?? []}
      columns={isManualRate ? RateColumns : AutoRateColumns}
      isLoading={isLoading}
      filterColumn={"propertyName"}
      CustomFilterComponent={RateTableHeader}
    />
  );
};

export default RateTable;
