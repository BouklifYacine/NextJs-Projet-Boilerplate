import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminKeys } from "./admin-keys";
import {
  banUser,
  unbanUser,
  setUserRole,
  removeUser,
} from "../server/admin.server";
import type { BanUserInput, SetRoleInput } from "../schemas/admin-schemas";

/**
 * Hook consolidating all admin user mutations.
 * Uses onSettled for reliable query invalidation (fires on success AND error).
 */
export function useAdminMutations() {
  const qc = useQueryClient();
  const invalidate = () =>
    qc.invalidateQueries({ queryKey: adminKeys.users() });

  return {
    banUser: useMutation({
      mutationFn: (input: BanUserInput) => banUser({ data: input }),
      onSuccess: () => toast.success("Utilisateur banni avec succès"),
      onError: (e: Error) => toast.error(e.message || "Échec du bannissement"),
      onSettled: invalidate,
    }),

    unbanUser: useMutation({
      mutationFn: (userId: string) => unbanUser({ data: { userId } }),
      onSuccess: () => toast.success("Utilisateur débanni avec succès"),
      onError: (e: Error) =>
        toast.error(e.message || "Échec du débannissement"),
      onSettled: invalidate,
    }),

    setRole: useMutation({
      mutationFn: (input: SetRoleInput) => setUserRole({ data: input }),
      onSuccess: (_, { role }) => toast.success(`Rôle mis à jour : ${role}`),
      onError: (e: Error) =>
        toast.error(e.message || "Échec de la mise à jour du rôle"),
      onSettled: invalidate,
    }),

    removeUser: useMutation({
      mutationFn: (userId: string) => removeUser({ data: { userId } }),
      onSuccess: () => toast.success("Utilisateur supprimé avec succès"),
      onError: (e: Error) =>
        toast.error(e.message || "Échec de la suppression"),
      onSettled: invalidate,
    }),
  };
}
