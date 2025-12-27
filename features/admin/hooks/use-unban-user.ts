import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminKeys } from "./admin-keys";
import { unbanUser } from "../server/admin.server";

/**
 * Hook for unbanning a user.
 */
export function useUnbanUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      return await unbanUser({ data: { userId } });
    },

    onSuccess: () => {
      toast.success("Utilisateur débanni avec succès");
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Échec du débannissement de l'utilisateur");
    },
  });
}
