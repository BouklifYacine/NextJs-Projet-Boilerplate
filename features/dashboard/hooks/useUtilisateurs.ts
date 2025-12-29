import { useSuspenseQuery } from "@tanstack/react-query";
import { getUtilisateursAction } from "../actions/getUtilisateursAction";
import type { UtilisateurReponse } from "../types/dashboard.types";

export function useUtilisateurs(page: number) {
  return useSuspenseQuery<UtilisateurReponse>({
    queryKey: ["utilisateurs", page],
    queryFn: async (): Promise<UtilisateurReponse> => {
      const response = await getUtilisateursAction({ data: { page } });
      return response as UtilisateurReponse;
    },
  });
}
