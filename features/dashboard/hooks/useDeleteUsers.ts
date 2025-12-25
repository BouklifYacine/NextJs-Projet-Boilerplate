import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUsers } from "../actions/SupprimerUtilisateur.action";
import toast from "react-hot-toast";
import type { UtilisateurReponse } from "../types/dashboard.types";

export function useDeleteUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await deleteUsers({ data: ids });
      if (!response.success) {
        throw new Error("Erreur sur la suppression des utilisateurs");
      }
      return response;
    },
    onMutate: async (ids) => {
      await queryClient.cancelQueries({ queryKey: ["utilisateurs"] });

      const dataAncienne = queryClient.getQueryData<UtilisateurReponse>([
        "utilisateurs",
      ]);

      if (dataAncienne)
        queryClient.setQueryData<UtilisateurReponse>(["utilisateurs"], {
          ...dataAncienne,
          data: dataAncienne.data.filter((user) => !ids.includes(user.id)),
        });

      return { dataAncienne };
    },
    onSuccess: (data, ids) => {
      toast.success(
        `${ids.length} utilisateur${ids.length > 1 ? "s" : ""} supprimé${ids.length > 1 ? "s" : ""}`
      );
    },

    onError: (error, variables, anciennevaleur) => {
      if (anciennevaleur?.dataAncienne) {
        queryClient.setQueryData(["utilisateurs"], anciennevaleur.dataAncienne);
      }
      toast.error(`Erreur lors de la suppression d'utilisateurs`);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["utilisateurs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}
