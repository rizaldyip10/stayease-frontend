"use client";

import RateTableHeader from "@/app/dashboard/rates/_components/RateTableHeader";
import DataTable from "@/components/ui/data-table";
import { RateResponseType } from "@/constants/Rates";
import { RateColumns } from "@/app/dashboard/rates/_components/RateTableColumn";
import React from "react";

interface RateTableProps {
  rates: RateResponseType[];
  isLoading: boolean;
}

const RateTable: React.FC<RateTableProps> = ({ rates, isLoading }) => {
  return (
    <DataTable
      data={rates ?? []}
      columns={RateColumns}
      isLoading={isLoading}
      filterColumn={"propertyName"}
      CustomFilterComponent={RateTableHeader}
    />
  );
};

export default RateTable;
