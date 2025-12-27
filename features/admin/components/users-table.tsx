import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useListUsers } from "../hooks";
import { UserActionsMenu } from "./user-actions-menu";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function UsersTable() {
  const { data, isLoading, isError, error } = useListUsers({ limit: 50 });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive p-4 text-center text-destructive">
        <p>Erreur lors du chargement des utilisateurs : {error.message}</p>
      </div>
    );
  }

  const users = data?.users ?? [];

  if (users.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        Aucun utilisateur trouvé
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Créé le</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge
                  variant={user.role === "Admin" ? "default" : "secondary"}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                {user.banned ? (
                  <Badge variant="destructive">Banni</Badge>
                ) : (
                  <Badge variant="outline" className="text-green-600">
                    Actif
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {dayjs(user.createdAt).fromNow()}
              </TableCell>
              <TableCell>
                <UserActionsMenu
                  userId={user.id}
                  userName={user.name}
                  isBanned={user.banned}
                  currentRole={user.role}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
