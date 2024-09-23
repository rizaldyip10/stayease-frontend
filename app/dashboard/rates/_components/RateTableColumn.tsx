import * as React from "react";
import Image from "next/image";
import DeleteDialog from "@/app/dashboard/properties/_components/DeleteDialog";
import { ColumnDef } from "@tanstack/table-core";
import { PropertyAndRoomType } from "@/constants/Property";
import { ArrowUpDown, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RateResponse } from "@/services/rateService";
import { formatDate } from "@/utils/dateFormatter";
import RateDeleteDialog from "@/app/dashboard/rates/_components/RateDeleteDialog";

export const RateColumns: ColumnDef<RateResponse>[] = [
  {
    accessorKey: "propertyName",
    header: "Property",
    cell: ({ row }) => {
      const rate = row.original;
      return (
        <div className="flex items-center gap-2">
          <p>{rate.propertySummary.propertyName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "adjustmentRate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0"
      >
        Adjustment Rate
        <ArrowUpDown className="ml-2 w-4 h-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("adjustmentRate")}</div>,
  },
  {
    accessorKey: "adjustmentType",
    header: "Adjustment Type",
    cell: ({ row }) => <div>{row.getValue("adjustmentType")}</div>,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0"
      >
        Start Date
        <ArrowUpDown className="ml-2 w-4 h-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("startDate")}</div>,
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0"
      >
        End Date
        <ArrowUpDown className="ml-2 w-4 h-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("endDate")}</div>,
  },
  {
    accessorKey: "validFrom",
    header: "Valid From",
    accessorFn: (row) => `${formatDate(row.validFrom)}`,
    cell: ({ row }) => <div>{row.getValue("validFrom")}</div>,
  },
  {
    id: "actions",
    header: "More",
    enableHiding: false,
    cell: ({ row }) => {
      const rateId = row.original.rateId;
      return (
        <div className="flex items-center gap-2">
          {/*TODO decide what to do with this*/}
          {/*<Link href={`/dashboard/properties/${rateId}/edit`}>*/}
          <Button variant="ghost" className="w-10 h-10 p-0">
            <Edit className="w-4 h-4" />
          </Button>
          {/*</Link>*/}
          <RateDeleteDialog rateId={rateId} />
        </div>
      );
    },
  },
];
