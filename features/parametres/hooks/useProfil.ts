import { useQuery } from "@tanstack/react-query";
import { getUserAccounts } from "../actions/getuseraccounts";

export function useProfil(userId: string) {
  return useQuery({
    queryKey: ["profil", userId],
    queryFn: async () => {
      const response = await getUserAccounts({ data: { userId } });
      return response;
    },
    enabled: !!userId,
  });
}
