import { useMutation, useQueryClient } from "@tanstack/react-query";
import { banUser } from "@/features/admin/server/admin.server";
import toast from "react-hot-toast";

/**
 * Hook for banning a user.
 * Invalidates the utilisateurs query on success.
 */
export function useBanUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) =>
      banUser({ data: { userId, banReason: "Banni par admin" } }),
    onSuccess: () => {
      toast.success("Utilisateur banni");
      queryClient.invalidateQueries({ queryKey: ["utilisateurs"] });
    },
    onError: () => toast.error("Erreur lors du bannissement"),
  });
}
