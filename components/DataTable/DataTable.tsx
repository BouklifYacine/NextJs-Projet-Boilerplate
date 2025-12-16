"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    RowSelectionState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { DataTableToolbar } from "./DataTableToolbar"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]

    // Search
    searchKey?: string
    searchPlaceholder?: string

    // Pagination
    pagination?: boolean
    pageSize?: number

    // Features
    enableRowSelection?: boolean
    enableSorting?: boolean
    enableFiltering?: boolean

    // Callbacks
    onRowSelectionChange?: (rows: TData[]) => void

    // Styling
    className?: string
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    searchPlaceholder = "Rechercher...",
    pagination = true,
    pageSize = 10,
    enableRowSelection = false,
    enableSorting = true,
    enableFiltering = true,
    onRowSelectionChange,
    className,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
    const [globalFilter, setGlobalFilter] = React.useState("")

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),

        // Pagination
        ...(pagination && { getPaginationRowModel: getPaginationRowModel() }),

        // Sorting
        ...(enableSorting && {
            onSortingChange: setSorting,
            getSortedRowModel: getSortedRowModel(),
        }),

        // Filtering
        ...(enableFiltering && {
            onColumnFiltersChange: setColumnFilters,
            getFilteredRowModel: getFilteredRowModel(),
            onGlobalFilterChange: setGlobalFilter,
            globalFilterFn: "includesString",
        }),

        // Selection
        ...(enableRowSelection && {
            onRowSelectionChange: setRowSelection,
            enableRowSelection: true,
        }),

        // Visibility
        onColumnVisibilityChange: setColumnVisibility,

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },

        initialState: {
            pagination: {
                pageSize,
            },
        },
    })

    // Callback when selection changes
    React.useEffect(() => {
        if (onRowSelectionChange) {
            const selectedRows = table.getFilteredSelectedRowModel().rows.map(row => row.original)
            onRowSelectionChange(selectedRows)
        }
    }, [rowSelection, onRowSelectionChange, table])

    return (
        <div className={className}>
            {/* Toolbar avec recherche */}
            {(enableFiltering || searchKey) && (
                <DataTableToolbar
                    table={table}
                    searchKey={searchKey}
                    searchPlaceholder={searchPlaceholder}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            )}

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
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
                                    Aucun résultat.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {pagination && table.getPageCount() > 0 && (
                <Pagination className="mt-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => table.previousPage()}
                                aria-disabled={!table.getCanPreviousPage()}
                                className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : "cursor-pointer"} size={undefined} />
                        </PaginationItem>

                        {Array.from({ length: table.getPageCount() }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    onClick={() => table.setPageIndex(i)}
                                    isActive={table.getState().pagination.pageIndex === i}
                                    className="cursor-pointer" size={undefined}                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => table.nextPage()}
                                aria-disabled={!table.getCanNextPage()}
                                className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : "cursor-pointer"} size={undefined} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}
