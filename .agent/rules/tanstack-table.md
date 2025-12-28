---
trigger: always_on
---

# TanStack Table Pro Rules

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

For complex data grids, we use TanStack Table (HEADLESS).

## 1. Setup

- **useReactTable**: The core hook. Pass `data` and `columns`.
- **Memoization**: `data` and `columns` MUST be memoized (`useMemo`) to prevent infinite render loops.

## 2. Column Definitions

- **Helper**: Use `createColumnHelper` for type safety.
  ```tsx
  const columnHelper = createColumnHelper<User>();
  const columns = [
    columnHelper.accessor("name", {
      header: "Full Name",
      cell: (info) => info.getValue(),
    }),
  ];
  ```

## 3. Rendering

- **Headless**: YOU are responsible for `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>`.
- **Flexibility**: Apply Tailwind classes to these elements for styling.

## 4. Features

- **Pagination**: Implement manual pagination state `pagination: { pageIndex, pageSize }` if doing server-side pagination (recommended for large sets).
- **Sorting/Filtering**: Manage state in the parent or URL (using TanStack Router search params) so the table state is shareable.
