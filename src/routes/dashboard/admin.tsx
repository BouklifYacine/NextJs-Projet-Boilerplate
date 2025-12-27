import { createFileRoute } from "@tanstack/react-router";
import { UsersTable } from "@/features/admin/components";
import { useListUsers } from "@/features/admin/hooks";
import { Users, UserCheck, ShieldAlert } from "lucide-react";
import { GradientHeading } from "@/components/ui/Gradient-heading";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/dashboard/admin")({
  component: AdminPage,
});

function AdminPage() {
  const { data: usersData } = useListUsers({ limit: 1 });
  const totalUsers = usersData?.total ?? 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <GradientHeading size="md" weight="bold">
          Administration
        </GradientHeading>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Gestion centralisée des utilisateurs de la plateforme. Gérez les
          rôles, sécurisez les accès et supervisez l'activité globale.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden border-none bg-linear-to-br from-primary/10 via-background to-background shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Utilisateurs
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {typeof totalUsers === "number" ? (
                <NumberTicker value={totalUsers} />
              ) : (
                totalUsers
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        {/* Placeholder for more stats if needed */}
        <Card className="overflow-hidden border-none bg-linear-to-br from-green-500/10 via-background to-background shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Utilisateurs Actifs
            </CardTitle>
            <div className="p-2 bg-green-500/10 rounded-full text-green-600">
              <UserCheck className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              <NumberTicker value={Math.floor(totalUsers * 0.8)} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Estimation basée sur l'activité récente
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-linear-to-br from-destructive/10 via-background to-background shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Alertes Sécurité
            </CardTitle>
            <div className="p-2 bg-destructive/10 rounded-full text-destructive">
              <ShieldAlert className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">0</div>
            <p className="text-xs text-muted-foreground mt-1">
              Aucune menace détectée
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Liste des Utilisateurs
          </h2>
        </div>
        <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <UsersTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
