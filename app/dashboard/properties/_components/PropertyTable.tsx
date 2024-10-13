"use client";

import { PropertyColumns as columns } from "@/app/dashboard/properties/_components/PropertyTableColumn";
import { useTenantProperties } from "@/hooks/properties/useTenantProperties";
import TableHeaders from "@/app/dashboard/properties/_components/TableHeaders";
import DataTable from "@/components/ui/data-table";
import React from "react";
import GlobalLoading from "@/components/GlobalLoading";
import ErrorComponent from "@/components/ErrorComponent";

const PropertyTable = () => {
  const { properties, isLoading, error } = useTenantProperties();
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[200px]">
        <GlobalLoading width={100} height={100} />
      </div>
    );

  if (error) {
    return <ErrorComponent message={error.message} fullPage />;
  }

  return (
    <DataTable
      data={properties ?? []}
      columns={columns}
      isLoading={isLoading}
      filterColumn={"propertyName"}
      CustomFilterComponent={TableHeaders}
    />
  );
};

export default PropertyTable;
