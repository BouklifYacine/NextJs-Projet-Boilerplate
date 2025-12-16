# DataTable Component

Composant de tableau de données flexible basé sur TanStack Table avec des helpers de colonnes simplifiés.

## Installation

Le composant est déjà disponible dans le projet. Import depuis:

```tsx
import { DataTable, createColumns, textColumn } from "@/components/DataTable"
```

---

## Usage Basique

### 1. Définir vos données

```tsx
// data.ts
export type User = {
    id: string
    name: string
    email: string
    role: "Admin" | "Utilisateur"
    status: "Actif" | "Inactif"
    createdAt: string
}

export const users: User[] = [
    { id: "1", name: "Jean Dupont", email: "jean@example.com", role: "Admin", status: "Actif", createdAt: "2024-01-15" },
    // ...
]
```

### 2. Définir vos colonnes

```tsx
// columns.tsx
import { createColumns, textColumn, dateColumn } from "@/components/DataTable"
import { User } from "./data"

export const columns = createColumns<User>([
    textColumn({ accessorKey: "name", title: "Nom" }),
    textColumn({ accessorKey: "email", title: "Email" }),
    dateColumn({ accessorKey: "createdAt", title: "Date de création" }),
])
```

**Explication:**
- `accessorKey` → La clé dans vos données (ex: `"name"` = `user.name`)
- `title` → Le texte affiché dans l'en-tête du tableau

### 3. Utiliser le DataTable

```tsx
// page.tsx
import { DataTable } from "@/components/DataTable"
import { columns } from "./columns"
import { users } from "./data"

export default function Page() {
    return <DataTable columns={columns} data={users} />
}
```

---

## Contrôle des fonctionnalités par colonne

Chaque colonne contrôle ses propres fonctionnalités via ses options:

### Tri (Sorting)

Le tri est activé par défaut sur chaque colonne. Pour désactiver:

```tsx
// Cette colonne ne sera PAS triable
textColumn({ 
    accessorKey: "description", 
    title: "Description",
    enableSorting: false  // ← Désactive le tri pour cette colonne
})

// Cette colonne sera triable (défaut)
textColumn({ 
    accessorKey: "name", 
    title: "Nom"
    // enableSorting: true (par défaut)
})
```

### Colonnes spéciales

Certaines colonnes ont le tri désactivé par défaut:
- `selectColumn()` - checkbox, pas de tri
- `actionsColumn()` - boutons, pas de tri
- `imageColumn()` - images, pas de tri

---

## Column Helpers

### Colonnes de texte

```tsx
textColumn({ 
    accessorKey: "name",  // user.name
    title: "Nom",         // Affiché dans l'en-tête
    className: "font-bold",  // Optionnel: classes CSS
    enableSorting: true      // Optionnel: tri activé (défaut: true)
})
```

### Colonnes avec Badge

```tsx
badgeColumn({ 
    accessorKey: "status",
    title: "Statut",
    variants: {
        "Actif": "default",      // Vert
        "Inactif": "outline",    // Bordure
        "En attente": "secondary" // Gris
    },
    enableSorting: true  // Optionnel
})
```

### Colonnes de nombres

```tsx
// Nombre simple
numberColumn({ accessorKey: "quantity", title: "Quantité" })

// Devise
currencyColumn({ 
    accessorKey: "price", 
    title: "Prix",
    currency: "EUR"  // → 1 234,56 €
})

// Pourcentage
percentColumn({ 
    accessorKey: "progress", 
    title: "Progression",
    decimals: 1  // → 75.5%
})
```

### Colonnes de dates

```tsx
dateColumn({ 
    accessorKey: "createdAt", 
    title: "Créé le" 
})

// Avec format personnalisé
dateColumn({ 
    accessorKey: "createdAt", 
    title: "Créé le",
    locale: "fr-FR",
    dateOptions: { year: "numeric", month: "long", day: "numeric" }
})
```

### Colonnes booléennes

```tsx
booleanColumn({ 
    accessorKey: "isActive", 
    title: "Actif" 
})  // → ✓ ou ✗

// Personnalisé
booleanColumn({ 
    accessorKey: "isActive", 
    title: "Actif",
    trueText: "Oui",
    falseText: "Non",
    trueClassName: "text-green-500",
    falseClassName: "text-red-500"
})
```

### Colonnes d'images

```tsx
imageColumn({ 
    accessorKey: "avatar", 
    title: "Photo",
    width: 40, 
    height: 40,
    className: "rounded-full"
})
// Note: enableSorting est toujours false pour les images
```

### Colonnes de liens

```tsx
linkColumn({ 
    accessorKey: "website", 
    title: "Site web", 
    external: true  // Ouvre dans nouvel onglet
})

// Avec href personnalisé
linkColumn({ 
    accessorKey: "email", 
    title: "Email",
    href: (value) => `mailto:${value}`
})
```

### Colonnes de sélection et actions

```tsx
// Checkbox de sélection (pas de tri)
selectColumn()

// Menu d'actions (pas de tri)
actionsColumn({
    onView: (user) => router.push(`/users/${user.id}`),
    onEdit: (user) => openEditModal(user),
    onDelete: (user) => deleteUser(user.id),
})
```

---

## Rendu personnalisé (Custom Cell)

Pour un contrôle total sur le rendu d'une cellule, utilisez `customColumn`:

```tsx
import { customColumn } from "@/components/DataTable"

customColumn({
    accessorKey: "status",
    title: "Statut",
    enableSorting: false,  // Optionnel: désactiver le tri
    render: ({ row, getValue }) => {
        const status = getValue() as string
        const user = row.original  // Données complètes de la ligne
        
        return (
            <div className="flex items-center gap-2">
                <Badge variant={status === "Actif" ? "default" : "outline"}>
                    {status}
                </Badge>
                {user.role === "Admin" && (
                    <span className="text-xs text-muted-foreground">(Admin)</span>
                )}
            </div>
        )
    }
})
```

### Contexte disponible dans `render`

| Propriété | Description |
|-----------|-------------|
| `row.original` | Données complètes de la ligne |
| `row.index` | Index de la ligne |
| `row.id` | ID unique de la ligne |
| `getValue()` | Valeur de la cellule courante |
| `cell` | Objet cellule TanStack |
| `column` | Objet colonne TanStack |
| `table` | Instance du tableau |

---

## Props du DataTable

```tsx
<DataTable
    // Requis
    columns={columns}
    data={data}
    
    // Recherche / Filtrage (affiche la toolbar)
    enableFiltering={true}
    searchPlaceholder="Rechercher..."
    
    // Pagination
    pagination={true}
    pageSize={10}
    
    // Sélection
    enableRowSelection={true}
    onRowSelectionChange={(selectedRows) => {
        console.log("Sélection:", selectedRows)
    }}
    
    // Style
    className="my-custom-class"
/>
```

### Comportement par défaut

| Prop | Défaut | Description |
|------|--------|-------------|
| `pagination` | `false` | Pas de pagination |
| `enableFiltering` | `false` | Pas de toolbar de recherche |
| `enableRowSelection` | `false` | Pas de sélection |
| `pageSize` | `10` | 10 éléments par page |

> **Note**: Le tri est contrôlé **par colonne** via `enableSorting` dans chaque column helper, pas au niveau du DataTable.

---

## Exemples

### Table basique (sans fonctionnalités)

```tsx
<DataTable columns={columns} data={data} />
```

### Table avec recherche et pagination

```tsx
<DataTable
    columns={columns}
    data={data}
    enableFiltering
    pagination
    pageSize={10}
    searchPlaceholder="Rechercher..."
/>
```

### Table complète

```tsx
<DataTable
    columns={columns}
    data={data}
    enableFiltering
    enableRowSelection
    pagination
    pageSize={5}
    searchPlaceholder="Rechercher un utilisateur..."
    onRowSelectionChange={(rows) => setSelected(rows)}
/>
```

### Colonnes avec tri sélectif

```tsx
const columns = createColumns<Product>([
    selectColumn(),  // Pas de tri
    textColumn({ accessorKey: "name", title: "Produit" }),  // Triable
    textColumn({ accessorKey: "description", title: "Description", enableSorting: false }),  // Non triable
    currencyColumn({ accessorKey: "price", title: "Prix" }),  // Triable
    imageColumn({ accessorKey: "image", title: "Photo" }),  // Pas de tri (automatique)
    actionsColumn({ onEdit, onDelete }),  // Pas de tri
])
```

---

## Structure des fichiers

```
components/DataTable/
├── DataTable.tsx           # Composant principal
├── DataTable.types.ts      # Types TypeScript
├── DataTableColumnHeader.tsx   # Header triable
├── DataTablePagination.tsx     # Pagination
├── DataTableRowActions.tsx     # Menu actions
├── DataTableToolbar.tsx        # Toolbar recherche
├── columnHelpers.tsx       # Helpers de colonnes
├── index.ts                # Exports
└── README.md               # Cette documentation
```
