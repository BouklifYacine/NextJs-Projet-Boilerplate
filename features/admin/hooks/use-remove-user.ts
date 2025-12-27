import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminKeys } from "./admin-keys";
import { removeUser } from "../server/admin.server";

/**
 * Hook for removing/deleting a user.
 */
export function useRemoveUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      return await removeUser({ data: { userId } });
    },

    onSuccess: () => {
      toast.success("Utilisateur supprimé avec succès");
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Échec de la suppression de l'utilisateur");
    },
  });
}
