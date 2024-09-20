"use client";

import {PropertyColumns as columns} from "@/app/dashboard/properties/_components/PropertyTableColumn";
import {useTenantProperties} from "@/hooks/useTenantProperties";
import TableHeaders from "@/app/dashboard/properties/_components/TableHeaders";
import DataTable from "@/components/ui/data-table";

const PropertyTable = () => {
    const { properties, isLoading, error } = useTenantProperties();

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