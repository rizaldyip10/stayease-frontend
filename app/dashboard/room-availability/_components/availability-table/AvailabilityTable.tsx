import React from "react";
import DataTable from "@/components/ui/data-table";
import { AvailabilityColumns } from "./AvailabilityTableColumn";
import AvailabilityTableHeader from "./AvailabilityTableHeader";
import { AvailabilityResponse } from "@/services/availabilityService";

interface AvailabilityTableProps {
  availability: AvailabilityResponse[];
  onRemove: (id: number) => void;
}

const AvailabilityTable: React.FC<AvailabilityTableProps> = ({
  availability,
  onRemove,
}) => {
  return (
    <DataTable
      data={availability}
      columns={AvailabilityColumns({ onRemove })}
      isLoading={false}
      filterColumn="startDate"
      CustomFilterComponent={AvailabilityTableHeader}
    />
  );
};

export default AvailabilityTable;
