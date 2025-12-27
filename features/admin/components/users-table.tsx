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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useListUsers } from "../hooks";
import { UserActionsMenu } from "./user-actions-menu";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";

dayjs.extend(relativeTime);
dayjs.locale("fr");

export function UsersTable() {
  const { data: sessionData } = useSession();
  const { data, isLoading, isError, error } = useListUsers({ limit: 50 });

  if (isLoading && !data) {
    return (
      <div className="p-4 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
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

  const users = data?.users ?? [];

  if (users.length === 0) {
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
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[300px] py-4">Utilisateur</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="hidden md:table-cell">
              Date d'inscription
            </TableHead>
            <TableHead className="text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="group transition-colors hover:bg-muted/20"
            >
              <TableCell className="py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-background shadow-sm">
                    <AvatarImage
                      src={user.image ?? undefined}
                      alt={user.name}
                    />
                    <AvatarFallback className="bg-primary/5 text-primary text-xs font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm tracking-tight">
                        {user.name}
                      </span>
                      {user.id === sessionData?.user?.id && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                          Moi
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground md:hidden">
                      {user.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "font-medium px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider",
                    user.role === "Admin"
                      ? "border-primary/20 bg-primary/5 text-primary shadow-sm"
                      : "border-muted-foreground/20 bg-muted/50 text-muted-foreground"
                  )}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                {user.banned ? (
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20 w-fit">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-destructive"></span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-tight">
                      Banni
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 w-fit">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-tight">
                      Actif
                    </span>
                  </div>
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    {dayjs(user.createdAt).format("D MMMM YYYY")}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60">
                    {dayjs(user.createdAt).fromNow()}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right pr-4">
                <UserActionsMenu
                  userId={user.id}
                  userName={user.name}
                  isBanned={user.banned}
                  currentRole={user.role}
                  currentUserId={sessionData?.user?.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
