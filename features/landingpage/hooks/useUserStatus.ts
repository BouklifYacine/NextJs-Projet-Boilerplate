import { useQuery } from "@tanstack/react-query";
import { UtilisateurAbonner } from "@/src/actions/UtilisateurAbonner";
import { AdminAction } from "@/src/actions/AdminAction";

export const useUserStatus = () => {
  return useQuery({
    queryKey: ["userStatus"],
    queryFn: async () => {
      const [abonnement, admin] = await Promise.all([
        UtilisateurAbonner(),
        AdminAction(),
      ]);
      return { abonnement, admin };
    },
  });
};
