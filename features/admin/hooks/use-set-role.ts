import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminKeys } from "./admin-keys";
import type { SetRoleInput } from "../schemas/admin-schemas";
import { setUserRole } from "../server/admin.server";

/**
 * Hook for setting user role.
 */
export function useSetUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: SetRoleInput) => {
      return await setUserRole({ data: input });
    },

    onSuccess: (_data, { role }) => {
      toast.success(`Rôle mis à jour : ${role}`);
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Échec de la mise à jour du rôle");
    },
  });
}
