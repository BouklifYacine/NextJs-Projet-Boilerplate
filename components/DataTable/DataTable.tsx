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
import { DataTableProps } from "./DataTable.types"

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    searchPlaceholder = "Rechercher...",
    pagination = false,
    pageSize = 10,
    enableRowSelection = false,
    enableFiltering = false,
    onRowSelectionChange,
    className,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
    const [globalFilter, setGlobalFilter] = React.useState("")

    // Détermine si la toolbar doit être affichée
    const showToolbar = enableFiltering || searchKey

    // Détermine si la pagination doit être affichée
    const showPagination = pagination

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),

        // Pagination - seulement si activée
        ...(showPagination && { getPaginationRowModel: getPaginationRowModel() }),

        // Sorting - toujours activé, chaque colonne contrôle son propre tri via enableSorting
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),

        // Filtering - seulement si activé (pour la toolbar)
        ...(enableFiltering && {
            onColumnFiltersChange: setColumnFilters,
            getFilteredRowModel: getFilteredRowModel(),
            onGlobalFilterChange: setGlobalFilter,
            globalFilterFn: "includesString",
        }),

        // Selection - seulement si activée
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
        if (onRowSelectionChange && enableRowSelection) {
            const selectedRows = table.getFilteredSelectedRowModel().rows.map(row => row.original)
            onRowSelectionChange(selectedRows)
        }
    }, [rowSelection, onRowSelectionChange, table, enableRowSelection])

    return (
        <div className={className}>
            {/* Toolbar avec recherche - seulement si nécessaire */}
            {showToolbar && (
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

            {/* Pagination - seulement si activée */}
            {showPagination && table.getPageCount() > 1 && (
                <Pagination className="mt-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => table.previousPage()}
                                aria-disabled={!table.getCanPreviousPage()}
                                className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>

                        {Array.from({ length: table.getPageCount() }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    onClick={() => table.setPageIndex(i)}
                                    isActive={table.getState().pagination.pageIndex === i}
                                    className="cursor-pointer"
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => table.nextPage()}
                                aria-disabled={!table.getCanNextPage()}
                                className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}
