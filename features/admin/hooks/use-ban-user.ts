import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminKeys } from "./admin-keys";
import type { BanUserInput } from "../schemas/admin-schemas";
import { banUser } from "../server/admin.server";

/**
 * Hook for banning a user.
 */
export function useBanUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: BanUserInput) => {
      return await banUser({ data: input });
    },

    onSuccess: () => {
      toast.success("Utilisateur banni avec succès");
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Échec du bannissement de l'utilisateur");
    },
  });
}
