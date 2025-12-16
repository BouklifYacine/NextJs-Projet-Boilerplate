import { ColumnDef } from "@tanstack/react-table"

/**
 * Props pour le composant DataTable
 */
export interface DataTableProps<TData, TValue> {
    /** Définition des colonnes */
    columns: ColumnDef<TData, TValue>[]
    /** Données à afficher */
    data: TData[]

    // ========================
    // Recherche / Filtrage
    // ========================
    /** Clé de colonne pour la recherche spécifique */
    searchKey?: string
    /** Placeholder du champ de recherche */
    searchPlaceholder?: string
    /** Active le filtrage global (affiche la toolbar de recherche) */
    enableFiltering?: boolean

    // ========================
    // Pagination
    // ========================
    /** Active la pagination */
    pagination?: boolean
    /** Nombre d'éléments par page */
    pageSize?: number

    // ========================
    // Sélection
    // ========================
    /** Active la sélection de lignes */
    enableRowSelection?: boolean
    /** Callback lors du changement de sélection */
    onRowSelectionChange?: (rows: TData[]) => void

    // ========================
    // Style
    // ========================
    /** Classes CSS additionnelles */
    className?: string
}

// ============================================
// COLUMN HELPER OPTIONS
// ============================================

/**
 * Mapping des variantes de Badge par valeur
 */
export type BadgeVariantMap = Record<string, "default" | "secondary" | "destructive" | "outline">

/**
 * Options pour les colonnes d'actions
 */
export interface ActionColumnOptions<TData> {
    /** Callback pour l'action "Voir" */
    onView?: (data: TData) => void
    /** Callback pour l'action "Modifier" */
    onEdit?: (data: TData) => void
    /** Callback pour l'action "Supprimer" */
    onDelete?: (data: TData) => void
    /** Labels personnalisés */
    labels?: {
        view?: string
        edit?: string
        delete?: string
    }
}
