"use client"

import {
    createColumns,
    selectColumn,
    textColumn,
    badgeColumn,
    dateColumn,
    actionsColumn,
    customColumn,
} from "@/components/DataTable"
import { Badge } from "@/components/ui/badge"
import { User } from "./data"

// Définition simplifiée des colonnes avec syntaxe objet
export const columns = createColumns<User>([
    // Colonne de sélection
    selectColumn(),

    // Colonnes de texte simple
    textColumn({
        accessorKey: "name",   // Clé dans les données (user.name)
        title: "Nom"           // Titre affiché dans l'en-tête
    }),

    textColumn({
        accessorKey: "email",
        title: "Email",
        className: ""  // Option: classes CSS personnalisées
    }),

    // Colonnes avec Badge
    badgeColumn({
        accessorKey: "role",
        title: "Rôle",
        variants: {
            "Admin": "destructive",
            "Modérateur": "secondary",
            "Utilisateur": "outline",
        }
    }),

    // Custom column - Exemple avec accès au contexte TanStack complet
    customColumn({
        accessorKey: "status",
        title: "Statut",
        render: ({ row, getValue }) => {
            // Accès complet au contexte TanStack !
            const status = getValue() as string
            const user = row.original  // Données complètes de la ligne
            const variant = status === "Actif"
                ? "default"
                : status === "En attente"
                    ? "secondary"
                    : "outline"

            return (
                <div className="flex items-center gap-2">
                    <Badge variant={variant}>{status}</Badge>
                    {user.role === "Admin" && (
                        <span className="text-xs text-muted-foreground">
                            (Admin)
                        </span>
                    )}
                </div>
            )
        }
    }),

    // Colonne de date
    dateColumn({
        accessorKey: "createdAt",
        title: "Créé le"
    }),

    // Colonne d'actions
    actionsColumn({
        onView: (user) => alert(`Voir: ${user.name}`),
        onEdit: (user) => alert(`Modifier: ${user.name}`),
        onDelete: (user) => alert(`Supprimer: ${user.name}`),
    }),
])
