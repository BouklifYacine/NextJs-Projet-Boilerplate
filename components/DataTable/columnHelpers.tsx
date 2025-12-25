import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowActions";
import { BadgeVariantMap, ActionColumnOptions } from "./DataTable.types";
import { ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";

// ============================================
// UTILITY
// ============================================

/**
 * Crée un tableau de colonnes typé
 */
export function createColumns<TData>(
  columns: ColumnDef<TData, unknown>[]
): ColumnDef<TData, unknown>[] {
  return columns;
}

// ============================================
// SPECIAL COLUMNS
// ============================================

/**
 * Colonne de sélection avec checkbox
 */
export function selectColumn<TData>(): ColumnDef<TData, unknown> {
  return {
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
  };
}

/**
 * Colonne d'actions (voir, modifier, supprimer)
 */
export function actionsColumn<TData>(
  options: ActionColumnOptions<TData>
): ColumnDef<TData, unknown> {
  return {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={options.onView}
        onEdit={options.onEdit}
        onDelete={options.onDelete}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}

// ============================================
// TEXT / STRING COLUMNS
// ============================================

/**
 * Colonne de texte simple avec tri
 *
 * @example
 * textColumn({ accessorKey: "name", title: "Nom" })
 * textColumn({ accessorKey: "email", title: "Email", className: "text-blue-500" })
 */
export function textColumn<TData>(options: {
  /** Clé d'accès dans les données (ex: "name" pour user.name) */
  accessorKey: keyof TData & string;
  /** Titre affiché dans l'en-tête du tableau */
  title: string;
  /** Classes CSS pour le texte */
  className?: string;
  /** Active le tri (défaut: true) */
  enableSorting?: boolean;
}): ColumnDef<TData, unknown> {
  return {
    accessorKey: options.accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={options.title} />
    ),
    cell: ({ row }) => (
      <div className={options.className ?? "font-medium"}>
        {row.getValue(options.accessorKey) as string}
      </div>
    ),
    enableSorting: options.enableSorting ?? true,
  };
}

/**
 * Colonne avec Badge et mapping de variantes
 *
 * @example
 * badgeColumn({
 *     accessorKey: "status",
 *     title: "Statut",
 *     variants: { "Actif": "default", "Inactif": "outline" }
 * })
 */
export function badgeColumn<TData>(options: {
  /** Clé d'accès dans les données */
  accessorKey: keyof TData & string;
  /** Titre affiché dans l'en-tête */
  title: string;
  /** Mapping valeur → variante de Badge */
  variants?: BadgeVariantMap;
  /** Variante par défaut si valeur non trouvée */
  defaultVariant?: "default" | "secondary" | "destructive" | "outline";
  /** Active le tri (défaut: true) */
  enableSorting?: boolean;
}): ColumnDef<TData, unknown> {
  return {
    accessorKey: options.accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={options.title} />
    ),
    cell: ({ row }) => {
      const value = row.getValue(options.accessorKey) as string;
      const variant =
        options.variants?.[value] ?? options.defaultVariant ?? "outline";
      return <Badge variant={variant}>{value}</Badge>;
    },
    enableSorting: options.enableSorting ?? true,
    filterFn: (row, id, filterValue) => {
      return filterValue.includes(row.getValue(id));
    },
  };
}

/**
 * Colonne de lien cliquable
 *
 * @example
 * linkColumn({ accessorKey: "website", title: "Site", external: true })
 * linkColumn({ accessorKey: "email", title: "Email", href: (v) => `mailto:${v}` })
 */
export function linkColumn<TData>(options: {
  /** Clé d'accès dans les données */
  accessorKey: keyof TData & string;
  /** Titre affiché dans l'en-tête */
  title: string;
  /** Fonction pour générer le href */
  href?: (value: string, row: TData) => string;
  /** Ouvre dans un nouvel onglet */
  external?: boolean;
  /** Classes CSS */
  className?: string;
  /** Active le tri (défaut: true) */
  enableSorting?: boolean;
}): ColumnDef<TData, unknown> {
  return {
    accessorKey: options.accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={options.title} />
    ),
    cell: ({ row }) => {
      const value = row.getValue(options.accessorKey) as string;
      const href = options.href ? options.href(value, row.original) : value;

      if (options.external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={
              options.className ??
              "text-primary hover:underline inline-flex items-center gap-1"
            }
          >
            {value}
            <ExternalLink className="h-3 w-3" />
          </a>
        );
      }

      return (
        <Link
          to={href}
          className={
            options.className ??
            "text-primary hover:underline inline-flex items-center gap-1"
          }
        >
          {value}
        </Link>
      );
    },
    enableSorting: options.enableSorting ?? true,
  };
}

// ============================================
// NUMBER COLUMNS
// ============================================

/**
 * Colonne de nombre avec formatage
 *
 * @example
 * numberColumn({ accessorKey: "quantity", title: "Quantité" })
 */
export function numberColumn<TData>(options: {
  /** Clé d'accès dans les données */
  accessorKey: keyof TData & string;
  /** Titre affiché dans l'en-tête */
  title: string;
  /** Locale pour le formatage (défaut: "fr-FR") */
  locale?: string;
  /** Options Intl.NumberFormat */
  numberOptions?: Intl.NumberFormatOptions;
  /** Classes CSS */
  className?: string;
  /** Active le tri (défaut: true) */
  enableSorting?: boolean;
}): ColumnDef<TData, unknown> {
  return {
    accessorKey: options.accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={options.title} />
    ),
    cell: ({ row }) => {
      const value = row.getValue(options.accessorKey) as number;
      return (
        <div className={options.className}>
          {value.toLocaleString(
            options.locale ?? "fr-FR",
            options.numberOptions
          )}
        </div>
      );
    },
    enableSorting: options.enableSorting ?? true,
  };
}

/**
 * Colonne de devise (€, $, etc.)
 *
 * @example
 * currencyColumn({ accessorKey: "price", title: "Prix" })
 * currencyColumn({ accessorKey: "salary", title: "Salaire", currency: "USD" })
 */
export function currencyColumn<TData>(options: {
  /** Clé d'accès dans les données */
  accessorKey: keyof TData & string;
  /** Titre affiché dans l'en-tête */
  title: string;
  /** Code devise (défaut: "EUR") */
  currency?: string;
  /** Locale pour le formatage (défaut: "fr-FR") */
  locale?: string;
  /** Classes CSS */
  className?: string;
  /** Active le tri (défaut: true) */
  enableSorting?: boolean;
}): ColumnDef<TData, unknown> {
  return {
    accessorKey: options.accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={options.title} />
    ),
    cell: ({ row }) => {
      const value = row.getValue(options.accessorKey) as number;
      return (
        <div className={options.className ?? "font-medium"}>
          {value.toLocaleString(options.locale ?? "fr-FR", {
            style: "currency",
            currency: options.currency ?? "EUR",
          })}
        </div>
      );
    },
    enableSorting: options.enableSorting ?? true,
  };
}

/**
 * Colonne de pourcentage
 *
 * @example
 * percentColumn({ accessorKey: "progress", title: "Progression" })
 * percentColumn({ accessorKey: "discount", title: "Réduction", decimals: 1 })
 */
export function percentColumn<TData>(options: {
  /** Clé d'accès dans les données */
  accessorKey: keyof TData & string;
  /** Titre affiché dans l'en-tête */
  title: string;
  /** Nombre de décimales (défaut: 0) */
  decimals?: number;
  /** Affiche le symbole % (défaut: true) */
  showSymbol?: boolean;
  /** Classes CSS */
  className?: string;
  /** Active le tri (défaut: true) */
  enableSorting?: boolean;
}): ColumnDef<TData, unknown> {
  return {
    accessorKey: options.accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={options.title} />
    ),
    cell: ({ row }) => {
      const value = row.getValue(options.accessorKey) as number;
      const decimals = options.decimals ?? 0;
      const formatted = value.toFixed(decimals);
      const symbol = options.showSymbol !== false ? "%" : "";

      return (
        <div className={options.className}>
          {formatted}
          {symbol}
        </div>
      );
    },
    enableSorting: options.enableSorting ?? true,
  };
}

// ============================================
// DATE COLUMNS
// ============================================

/**
 * Colonne de date avec formatage locale
 *
 * @example
 * dateColumn({ accessorKey: "createdAt", title: "Créé le" })
 */
export function dateColumn<TData>(options: {
  /** Clé d'accès dans les données */
  accessorKey: keyof TData & string;
  /** Titre affiché dans l'en-tête */
  title: string;
  /** Locale pour le formatage (défaut: "fr-FR") */
  locale?: string;
  /** Options Intl.DateTimeFormat */
  dateOptions?: Intl.DateTimeFormatOptions;
  /** Classes CSS */
  className?: string;
  /** Active le tri (défaut: true) */
  enableSorting?: boolean;
}): ColumnDef<TData, unknown> {
  return {
    accessorKey: options.accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={options.title} />
    ),
    cell: ({ row }) => {
      const value = row.getValue(options.accessorKey) as string | Date;
      const date = value instanceof Date ? value : new Date(value);
      return (
        <div className={options.className}>
          {date.toLocaleDateString(
            options.locale ?? "fr-FR",
            options.dateOptions
          )}
        </div>
      );
    },
    enableSorting: options.enableSorting ?? true,
  };
}

// ============================================
// BOOLEAN COLUMNS
// ============================================

/**
 * Colonne booléenne (✓ / ✗)
 *
 * @example
 * booleanColumn({ accessorKey: "isActive", title: "Actif" })
 * booleanColumn({ accessorKey: "verified", title: "Vérifié", trueText: "Oui", falseText: "Non" })
 */
export function booleanColumn<TData>(options: {
  /** Clé d'accès dans les données */
  accessorKey: keyof TData & string;
  /** Titre affiché dans l'en-tête */
  title: string;
  /** Texte pour true (défaut: "✓") */
  trueText?: string;
  /** Texte pour false (défaut: "✗") */
  falseText?: string;
  /** Classes CSS pour true */
  trueClassName?: string;
  /** Classes CSS pour false */
  falseClassName?: string;
  /** Active le tri (défaut: true) */
  enableSorting?: boolean;
}): ColumnDef<TData, unknown> {
  return {
    accessorKey: options.accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={options.title} />
    ),
    cell: ({ row }) => {
      const value = row.getValue(options.accessorKey) as boolean;
      const trueText = options.trueText ?? "✓";
      const falseText = options.falseText ?? "✗";
      const className = value
        ? (options.trueClassName ?? "text-green-600 font-medium")
        : (options.falseClassName ?? "text-red-500");

      return <span className={className}>{value ? trueText : falseText}</span>;
    },
    enableSorting: options.enableSorting ?? true,
  };
}

// ============================================
// IMAGE COLUMNS
// ============================================

/**
 * Colonne d'image
 *
 * @example
 * imageColumn({ accessorKey: "avatar", title: "Photo" })
 * imageColumn({ accessorKey: "thumbnail", title: "Image", width: 60, height: 60 })
 */
export function imageColumn<TData>(options: {
  /** Clé d'accès dans les données */
  accessorKey: keyof TData & string;
  /** Titre affiché dans l'en-tête */
  title: string;
  /** Largeur de l'image (défaut: 40) */
  width?: number;
  /** Hauteur de l'image (défaut: 40) */
  height?: number;
  /** Classes CSS */
  className?: string;
  /** Texte alternatif */
  alt?: string;
}): ColumnDef<TData, unknown> {
  return {
    accessorKey: options.accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={options.title} />
    ),
    cell: ({ row }) => {
      const src = row.getValue(options.accessorKey) as string;
      if (!src) return null;

      return (
        <Image
          src={src}
          alt={options.alt ?? ""}
          width={options.width ?? 40}
          height={options.height ?? 40}
          className={options.className ?? "rounded-md object-cover"}
        />
      );
    },
    enableSorting: false,
  };
}

// ============================================
// CUSTOM COLUMN (Full TanStack render control)
// ============================================

/**
 * Colonne personnalisée avec accès complet au contexte TanStack
 *
 * @example
 * customColumn({
 *     accessorKey: "status",
 *     title: "Statut",
 *     render: ({ row, getValue }) => {
 *         const status = getValue() as string
 *         const user = row.original
 *         return <MyComponent status={status} user={user} />
 *     }
 * })
 */
export function customColumn<TData>(options: {
  /** Clé d'accès dans les données */
  accessorKey: keyof TData & string;
  /** Titre affiché dans l'en-tête */
  title: string;
  /**
   * Fonction de rendu avec accès au contexte TanStack complet
   * @param context - Contexte de cellule (row, getValue, cell, etc.)
   */
  render: (context: CellContext<TData, unknown>) => React.ReactNode;
  /** Active le tri (défaut: true) */
  enableSorting?: boolean;
}): ColumnDef<TData, unknown> {
  return {
    accessorKey: options.accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={options.title} />
    ),
    cell: (context: CellContext<TData, unknown>) => options.render(context),
    enableSorting: options.enableSorting ?? true,
  };
}
