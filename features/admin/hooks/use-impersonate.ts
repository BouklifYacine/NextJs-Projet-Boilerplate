import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";
import { impersonateUser, stopImpersonation } from "../server/admin.server";

/**
 * Hook for impersonating a user.
 */
export function useImpersonateUser() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userId: string) => {
      return await impersonateUser({ data: { userId } });
    },

    onSuccess: () => {
      toast.success("Impersonnalisation en cours...");
      navigate({ to: "/dashboard" });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Échec de l'impersonnalisation");
    },
  });
}

/**
 * Hook for stopping impersonation.
 */
export function useStopImpersonation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      return await stopImpersonation();
    },

    onSuccess: () => {
      toast.success("Impersonnalisation terminée");
      navigate({ to: "/dashboard" });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Échec de l'arrêt de l'impersonnalisation");
    },
  });
}
