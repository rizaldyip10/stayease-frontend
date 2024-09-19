import * as React from "react";
import Image from "next/image";
import DeleteDialog from "@/app/dashboard/properties/_components/DeleteDialog";
import { ColumnDef } from "@tanstack/table-core";
import { PropertyAndRoomType } from "@/constants/Property";
import { ArrowUpDown, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const PropertyColumns: ColumnDef<PropertyAndRoomType>[] = [
  {
    accessorKey: "propertyName",
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
    cell: ({ row }) => {
      const property = row.original;
      return (
        <div className="flex items-center gap-2">
          <Image
            src={property?.imageUrl}
            alt={"image"}
            height={56}
            width={56}
            className="w-14 h-14 object-cover"
          />
          <p>{property.propertyName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
  },
  {
    accessorKey: "city",
    header: "City",
    accessorFn: (row) => `${row.city}, ${row.country}`,
    cell: ({ row }) => <div>{row.getValue("city")}</div>,
  },
  {
    id: "actions",
    header: "More",
    enableHiding: false,
    cell: ({ row }) => {
      const propertyId = row.original.id;
      return (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/properties/${propertyId}/edit`}>
            <Button variant="ghost" className="w-10 h-10 p-0">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <DeleteDialog isProperty propertyId={propertyId} />
        </div>
      );
    },
  },
];
