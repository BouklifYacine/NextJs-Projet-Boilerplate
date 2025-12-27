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
import {
  MoreHorizontal,
  Ban,
  UserCheck,
  Shield,
  Trash2,
  LogIn,
} from "lucide-react";
import {
  useBanUser,
  useUnbanUser,
  useSetUserRole,
  useRemoveUser,
  useImpersonateUser,
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
}

export function UserActionsMenu({
  userId,
  userName,
  isBanned,
  currentRole,
}: UserActionsMenuProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showBanDialog, setShowBanDialog] = useState(false);

  const banUser = useBanUser();
  const unbanUser = useUnbanUser();
  const setRole = useSetUserRole();
  const removeUser = useRemoveUser();
  const impersonate = useImpersonateUser();

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

  const handleImpersonate = () => {
    impersonate.mutate(userId);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleImpersonate}>
            <LogIn className="mr-2 h-4 w-4" />
            Impersonate
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleToggleRole}>
            <Shield className="mr-2 h-4 w-4" />
            {currentRole === "Admin" ? "Remove Admin" : "Make Admin"}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {isBanned ? (
            <DropdownMenuItem onClick={handleUnban}>
              <UserCheck className="mr-2 h-4 w-4" />
              Unban User
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => setShowBanDialog(true)}
              className="text-orange-600"
            >
              <Ban className="mr-2 h-4 w-4" />
              Ban User
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Ban Confirmation Dialog */}
      <AlertDialog open={showBanDialog} onOpenChange={setShowBanDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ban User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to ban <strong>{userName}</strong>? They
              will no longer be able to sign in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBan} className="bg-orange-600">
              Ban User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete{" "}
              <strong>{userName}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
