"use client"

import { Row } from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
    onView?: (data: TData) => void
    onEdit?: (data: TData) => void
    onDelete?: (data: TData) => void
    customActions?: {
        label: string
        icon?: React.ReactNode
        onClick: (data: TData) => void
        variant?: "default" | "destructive"
    }[]
}

export function DataTableRowActions<TData>({
    row,
    onView,
    onEdit,
    onDelete,
    customActions,
}: DataTableRowActionsProps<TData>) {
    const data = row.original

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Ouvrir le menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {onView && (
                    <DropdownMenuItem onClick={() => onView(data)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Voir
                    </DropdownMenuItem>
                )}

                {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(data)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Modifier
                    </DropdownMenuItem>
                )}

                {customActions?.map((action, index) => (
                    <DropdownMenuItem
                        key={index}
                        onClick={() => action.onClick(data)}
                        className={action.variant === "destructive" ? "text-destructive" : ""}
                    >
                        {action.icon}
                        {action.label}
                    </DropdownMenuItem>
                ))}

                {onDelete && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => onDelete(data)}
                            className="text-destructive"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
