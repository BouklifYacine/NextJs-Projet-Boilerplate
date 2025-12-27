import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Ban, UserCheck, Shield, Trash2 } from "lucide-react";
import {
  useBanUser,
  useUnbanUser,
  useSetUserRole,
  useRemoveUser,
} from "../hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UserActionsMenuProps {
  userId: string;
  userName: string;
  isBanned: boolean;
  currentRole: string;
  currentUserId?: string;
}

export function UserActionsMenu({
  userId,
  userName,
  isBanned,
  currentRole,
  currentUserId,
}: UserActionsMenuProps) {
  const isSelf = userId === currentUserId;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (isSelf) return null;
  const [showBanDialog, setShowBanDialog] = useState(false);

  const banUser = useBanUser();
  const unbanUser = useUnbanUser();
  const setRole = useSetUserRole();
  const removeUser = useRemoveUser();

  const handleBan = () => {
    banUser.mutate({ userId, banReason: "Violation of terms" });
    setShowBanDialog(false);
  };

  const handleUnban = () => {
    unbanUser.mutate(userId);
  };

  const handleToggleRole = () => {
    const newRole = currentRole === "Admin" ? "utilisateur" : "Admin";
    setRole.mutate({ userId, role: newRole });
  };

  const handleDelete = () => {
    removeUser.mutate(userId);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Ouvrir le menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleToggleRole}>
            <Shield className="mr-2 h-4 w-4" />
            {currentRole === "Admin"
              ? "Retirer le rôle Admin"
              : "Promouvoir Admin"}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {isBanned ? (
            <DropdownMenuItem onClick={handleUnban}>
              <UserCheck className="mr-2 h-4 w-4" />
              Débannir l'utilisateur
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => setShowBanDialog(true)}
              className="text-destructive focus:text-destructive"
            >
              <Ban className="mr-2 h-4 w-4" />
              Bannir l'utilisateur
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Supprimer l'utilisateur
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Ban Confirmation Dialog */}
      <AlertDialog open={showBanDialog} onOpenChange={setShowBanDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bannir l'utilisateur</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir bannir <strong>{userName}</strong> ? Il
              ne pourra plus se connecter.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBan}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Bannir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'utilisateur</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer définitivement{" "}
              <strong>{userName}</strong> ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
