"use client";

import {ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState} from "@tanstack/table-core";
import {BookingDataType} from "@/constants/Booking";
import {Button} from "@/components/ui/button";
import {ArrowDownIcon, EllipsisVertical} from "lucide-react";
import {useState} from "react";
import {flexRender, useReactTable} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import * as React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const columns: ColumnDef<BookingDataType>[] = [
    {
        id: "bookingId",
        header: "Booking ID",
        accessorFn: (row) => row.id,
        cell: ({ row }) => <div>{row.getValue("bookingId")}</div>
    },
    {
        id: "room",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Room
                <ArrowDownIcon className="ml-2 w-4 h-4" />
            </Button>
        ),
        accessorFn: (row) => row.bookingItems.map(i => i.room.name),
        cell: ({ row }) => <div>{row.getValue("room")}</div>
    },
    {
        id: "property",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Property
                <ArrowDownIcon className="ml-2 w-4 h-4" />
            </Button>
        ),
        accessorFn: (row) => row.property.propertyName,
        cell: ({ row }) => <div>{row.getValue("property")}</div>
    },
    {
        id: "checkInDate",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Check-in
                <ArrowDownIcon className="ml-2 w-4 h-4" />
            </Button>
        ),
        accessorFn: (row) => row.checkInDate,
        cell: ({ row }) => <div>{row.getValue("checkInDate")}</div>
    },
    {
        id: "checkOutDate",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Check-out
                <ArrowDownIcon className="ml-2 w-4 h-4" />
            </Button>
        ),
        accessorFn: (row) => row.checkOutDate,
        cell: ({ row }) => <div>{row.getValue("checkOutDate")}</div>
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        )
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <EllipsisVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem className="text-green-800">Accept</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-800">Reject</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];

const BookingTable = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable({
        data: tenantDummyData,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting
        }
    });
    return (
        <div className="w-full bg-white">
            <div className="rounded-md border border-gray-200">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BookingTable;