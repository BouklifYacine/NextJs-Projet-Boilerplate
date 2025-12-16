"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader, DataTableRowActions } from "@/components/DataTable"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { User } from "./data"

// Définition des colonnes
export const columns: ColumnDef<User>[] = [
    // Colonne de sélection
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Sélectionner tout"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Sélectionner la ligne"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    // Colonne Nom (triable)
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nom" />
        ),
        cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    // Colonne Email (triable)
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    // Colonne Role avec Badge
    {
        accessorKey: "role",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Rôle" />
        ),
        cell: ({ row }) => {
            const role = row.getValue("role") as string
            const variant = role === "Admin" ? "destructive" : role === "Modérateur" ? "secondary" : "outline"
            return <Badge variant={variant}>{role}</Badge>
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    // Colonne Status avec Badge
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Statut" />
        ),
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            const variant = status === "Actif" ? "default" : status === "En attente" ? "secondary" : "outline"
            return <Badge variant={variant}>{status}</Badge>
        },
    },
    // Colonne Date (triable)
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Créé le" />
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"))
            return date.toLocaleDateString("fr-FR")
        },
    },
    // Colonne Actions
    {
        id: "actions",
        cell: ({ row }) => (
            <DataTableRowActions
                row={row}
                onView={(user) => alert(`Voir: ${user.name}`)}
                onEdit={(user) => alert(`Modifier: ${user.name}`)}
                onDelete={(user) => alert(`Supprimer: ${user.name}`)}
            />
        ),
    },
]
