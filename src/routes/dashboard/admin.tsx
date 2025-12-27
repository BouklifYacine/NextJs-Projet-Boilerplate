import { createFileRoute } from "@tanstack/react-router";
import { UsersTable } from "@/features/admin/components";
import { useListUsers } from "@/features/admin/hooks";
import { Users, Shield } from "lucide-react";

export const Route = createFileRoute("/dashboard/admin")({
  component: AdminPage,
});

function AdminPage() {
  const { data: usersData } = useListUsers({ limit: 1 });
  const totalUsers = usersData?.total ?? "-";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">
              Tableau de Bord Administrateur
            </h1>
          </div>
          <p className="text-muted-foreground">
            Gérez les utilisateurs, les rôles et les permissions
          </p>
        </div>
      </div>

      {/* Stats - Optional */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">Total Utilisateurs</span>
          </div>
          <p className="mt-2 text-2xl font-bold">{totalUsers}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Tous les utilisateurs</h2>
        <UsersTable />
      </div>
    </div>
  );
}
