"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings2 } from "lucide-react"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    searchKey?: string
    searchPlaceholder?: string
    globalFilter: string
    setGlobalFilter: (value: string) => void
}

export function DataTableToolbar<TData>({
    table,
    searchKey,
    searchPlaceholder = "Rechercher...",
    globalFilter,
    setGlobalFilter,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0 || globalFilter.length > 0

    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex flex-1 items-center space-x-2">
                {/* Recherche globale ou par colonne */}
                {searchKey ? (
                    <Input
                        placeholder={searchPlaceholder}
                        value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn(searchKey)?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                ) : (
                    <Input
                        placeholder={searchPlaceholder}
                        value={globalFilter ?? ""}
                        onChange={(event) => setGlobalFilter(event.target.value)}
                        className="max-w-sm"
                    />
                )}

                {/* Reset filters */}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            table.resetColumnFilters()
                            setGlobalFilter("")
                        }}
                        className="h-8 px-2 lg:px-3"
                    >
                        Réinitialiser
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Column visibility */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="ml-auto">
                        <Settings2 className="mr-2 h-4 w-4" />
                        Colonnes
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
