import { ColumnDef } from "@tanstack/table-core";
import { RoomType } from "@/constants/Property";
import { ArrowUpDown, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";
import Image from "next/image";
import { currencyFormatter } from "@/utils/CurrencyFormatter";
import DeleteDialog from "@/app/dashboard/properties/_components/DeleteDialog";
import Link from "next/link";

export const RoomColumns: ColumnDef<RoomType>[] = [
  {
    accessorKey: "name",
    header: "Room",
    cell: ({ row }) => {
      const roomImage = row.original?.imageUrl;
      return (
        <div className="flex items-center gap-2">
          {roomImage ? (
            <Image
              src={roomImage}
              alt={"room"}
              height={56}
              width={56}
              className="w-14 h-14 object-cover"
            />
          ) : (
            <div className="w-14 h-14 bg-gray-200" />
          )}
          <p>{row.getValue("name")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "propertyName",
    accessorFn: (row) => row.propertySummary.propertyName,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0"
      >
        Property
        <ArrowUpDown className="ml-2 w-4 h-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("propertyName")}</div>,
  },
  {
    accessorKey: "basePrice",
    header: "Price",
    cell: ({ row }) => (
      <div>{currencyFormatter(row.getValue("basePrice"))}</div>
    ),
  },
  {
    accessorKey: "listingId",
    accessorFn: (row) => row.id,
    header: "Listing ID",
    cell: ({ row }) => <div>{row.getValue("listingId")}</div>,
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
    cell: ({ row }) => <div>{row.getValue("capacity")}</div>,
  },
  {
    id: "actions",
    header: "More",
    enableHiding: false,
    cell: ({ row }) => {
      const roomId = row.original.id;
      const propertyId = row.original.propertySummary.propertyId;
      return (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/properties/${propertyId}/edit`}>
            <Button variant="ghost" className="w-10 h-10 p-0">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <DeleteDialog propertyId={propertyId} roomId={roomId} />
        </div>
      );
    },
  },
];
