// components/AvailabilityTableColumn.tsx
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import RemoveDialog from "@/app/dashboard/rates/_components/RateDeleteDialog";
import { AvailabilityResponse } from "@/services/availabilityService";

export const AvailabilityColumns = ({
  onRemove,
}: {
  onRemove: (id: number) => void;
}): ColumnDef<AvailabilityResponse>[] => [
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Start Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) =>
      format(new Date(getValue() as string), "MMM dd, yyyy"),
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        End Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) =>
      format(new Date(getValue() as string), "MMM dd, yyyy"),
  },
  {
    accessorKey: "isAvailable",
    header: "Status",
    cell: ({ getValue }) => (getValue() ? "Available" : "Unavailable"),
  },
  {
    accessorKey: "isManual",
    header: "Type",
    cell: ({ getValue }) => (getValue() ? "Manual" : "Automatic"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <RemoveDialog
        onConfirm={() => onRemove(row.original.id)}
        title="Remove Availability"
        description="Are you sure you want to remove this availability? This action cannot be undone."
        trigger={
          <Button
            size="sm"
            disabled={!row.original.isManual}
            className="bg-red-500 text-white hover:bg-gray-400 hover:text-red-500"
          >
            Remove
          </Button>
        }
      />
    ),
  },
];
