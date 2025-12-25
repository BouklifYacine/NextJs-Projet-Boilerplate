import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUtilisateursAction } from "../actions/getUtilisateursAction";
import type { UtilisateurReponse } from "../types/dashboard.types";

export function useUtilisateurs(page: number) {
  return useQuery<UtilisateurReponse>({
    queryKey: ["utilisateurs", page],
    queryFn: async () => {
      const response = await getUtilisateursAction({ data: { page } });
      return response as UtilisateurReponse;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
}
