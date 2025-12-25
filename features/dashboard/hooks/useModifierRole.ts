import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ModifierRole } from "@/features/dashboard/actions/ModifierRoleAction";
import type { UtilisateurReponse, Role } from "../types/dashboard.types";

export const useModifierRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      newRole,
    }: {
      userId: string;
      newRole: Role;
    }) => {
      const response = await ModifierRole({ data: { id: userId, newRole } });

      if (!response.success) {
        throw new Error("Impossible de changer de role");
      }

      return response.message;
    },

    onMutate: async ({ userId, newRole }) => {
      await queryClient.cancelQueries({ queryKey: ["utilisateurs"] });

      const dataAncienne = queryClient.getQueryData<UtilisateurReponse>([
        "utilisateurs",
      ]);

      if (dataAncienne) {
        queryClient.setQueryData<UtilisateurReponse>(["utilisateurs"], {
          ...dataAncienne,
          data: dataAncienne.data.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          ),
        });
      }
      return { dataAncienne };
    },

    onSuccess: (data, role) => {
      toast.success(`Role ${role.newRole} attribué`);
    },

    onError: (error, variables, context) => {
      if (context?.dataAncienne) {
        queryClient.setQueryData(["utilisateurs"], context.dataAncienne);
      }
      toast.error("Erreur lors de la modification du rôle");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["utilisateurs"] });
    },
  });
};
