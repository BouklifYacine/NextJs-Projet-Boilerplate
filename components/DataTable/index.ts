// Composants
export { DataTable } from "./DataTable"
export { DataTableColumnHeader } from "./DataTableColumnHeader"
export { DataTableRowActions } from "./DataTableRowActions"
export { DataTablePagination } from "./DataTablePagination"
export { DataTableToolbar } from "./DataTableToolbar"

// Types
export type {
    DataTableProps,
    BadgeVariantMap,
    ActionColumnOptions,
} from "./DataTable.types"

// Re-export CellContext from TanStack for custom render usage
export type { CellContext } from "@tanstack/react-table"

// Column Helpers
export {
    // Utility
    createColumns,
    // Special columns
    selectColumn,
    actionsColumn,
    // Text / String columns
    textColumn,
    badgeColumn,
    linkColumn,
    // Number columns
    numberColumn,
    currencyColumn,
    percentColumn,
    // Date columns
    dateColumn,
    // Boolean columns
    booleanColumn,
    // Image columns
    imageColumn,
    // Custom (full TanStack render)
    customColumn,
} from "./columnHelpers"
