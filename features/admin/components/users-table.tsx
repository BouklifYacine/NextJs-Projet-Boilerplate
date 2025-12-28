import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useListUsers } from "../hooks";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";
import { UsersTableSkeleton } from "./users-table-skeleton";
import { createUsersTableColumns } from "./users-table-columns";

export function UsersTable() {
  const { data: sessionData } = useSession();
  const { data, isLoading, isError, error } = useListUsers({ limit: 50 });

  const currentUserId = sessionData?.user?.id;

  const columns = useMemo(
    () => createUsersTableColumns({ currentUserId }),
    [currentUserId]
  );

  const tableData = useMemo(() => data?.users ?? [], [data?.users]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading && !data) {
    return <UsersTableSkeleton />;
  }

  if (isError) {
    return (
      <div className="m-4 rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center text-destructive">
        <p className="font-medium">
          Erreur lors du chargement des utilisateurs
        </p>
        <p className="text-sm opacity-80">{error.message}</p>
      </div>
    );
  }

  if (tableData.length === 0) {
    return (
      <div className="m-4 rounded-xl border border-dashed p-12 text-center">
        <p className="text-muted-foreground">Aucun utilisateur trouvé</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/30">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    "py-4",
                    header.id === "name" && "w-[300px]",
                    (header.id === "email" || header.id === "createdAt") &&
                      "hidden md:table-cell"
                  )}
                >
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
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="group transition-colors hover:bg-muted/20"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    "py-4",
                    (cell.column.id === "email" ||
                      cell.column.id === "createdAt") &&
                      "hidden md:table-cell"
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
