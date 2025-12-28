import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserActionsMenu } from "./user-actions-menu";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import { cn } from "@/lib/utils";
import { AdminUserSerialized } from "../types/admin-types";

dayjs.extend(relativeTime);
dayjs.locale("fr");

const columnHelper = createColumnHelper<AdminUserSerialized>();

interface ColumnOptions {
  currentUserId?: string;
}

export function createUsersTableColumns({ currentUserId }: ColumnOptions) {
  return [
    columnHelper.accessor("name", {
      header: "Utilisateur",
      cell: (info) => {
        const user = info.row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-background shadow-sm">
              <AvatarImage src={user.image ?? undefined} alt={user.name} />
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
                {user.id === currentUserId && (
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
        );
      },
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => (
        <span className="text-sm text-muted-foreground">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("role", {
      header: "Rôle",
      cell: (info) => {
        const role = info.getValue();
        return (
          <Badge
            variant="outline"
            className={cn(
              "font-medium px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider",
              role === "Admin"
                ? "border-primary/20 bg-primary/5 text-primary shadow-sm"
                : "border-muted-foreground/20 bg-muted/50 text-muted-foreground"
            )}
          >
            {role}
          </Badge>
        );
      },
    }),
    columnHelper.accessor("banned", {
      header: "Statut",
      cell: (info) => {
        const isBanned = info.getValue();
        return isBanned ? (
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
        );
      },
    }),
    columnHelper.accessor("createdAt", {
      header: "Date d'inscription",
      cell: (info) => {
        const date = info.getValue();
        return (
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              {dayjs(date).format("D MMMM YYYY")}
            </span>
            <span className="text-[10px] text-muted-foreground/60">
              {dayjs(date).fromNow()}
            </span>
          </div>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      header: () => <div className="text-right pr-6">Actions</div>,
      cell: (info) => {
        const user = info.row.original;
        return (
          <div className="text-right pr-4">
            <UserActionsMenu
              userId={user.id}
              userName={user.name}
              isBanned={user.banned}
              currentRole={user.role}
              currentUserId={currentUserId}
            />
          </div>
        );
      },
    }),
  ];
}
