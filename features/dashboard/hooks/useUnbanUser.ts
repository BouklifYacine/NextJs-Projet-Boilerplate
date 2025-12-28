import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unbanUser } from "@/features/admin/server/admin.server";
import toast from "react-hot-toast";

/**
 * Hook for unbanning a user.
 * Invalidates the utilisateurs query on success.
 */
export function useUnbanUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => unbanUser({ data: { userId } }),
    onSuccess: () => {
      toast.success("Utilisateur débanni");
      queryClient.invalidateQueries({ queryKey: ["utilisateurs"] });
    },
    onError: () => toast.error("Erreur lors du débannissement"),
  });
}
