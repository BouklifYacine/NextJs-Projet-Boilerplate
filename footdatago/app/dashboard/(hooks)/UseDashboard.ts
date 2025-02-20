import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { deleteUsers } from "../SupprimerUtilisateur.action";
import toast from "react-hot-toast";

export interface StatsResponse {
  data: {
    users: {
      total: number;
      pro: number;
    };
    abonnements: {
      mensuels: {
        nombre: number;
        revenus: number;
      };
      annuels: {
        nombre: number;
        revenus: number;
      };
      total: {
        revenus: string;
        mrr: string;
      };
    };
  };
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  role: "Admin" | "utilisateur";
  image: string | null;
  plan: "free" | "pro";
  createdAt: Date;
  abonnement?: {
    periode: "mois" | "année";
    datedebut: Date;
    datefin: Date;
  } | null;
}

interface UtilisateurReponse {
  data: User[];
  totalPages: number;
  message: string;
}

export type Role = "Admin" | "utilisateur";

export function useStats() {
  return useQuery<StatsResponse>({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await axios.get<StatsResponse>("/api/revenudetail");
      return data;
    },
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
}

export function useUtilisateurs(page: number) {
  return useQuery<UtilisateurReponse>({
    queryKey: ["utilisateurs", page],
    queryFn: async () => {
      const { data } = await axios.get<UtilisateurReponse>(
        `/api/totalutilisateur?page=${page}`
      );
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
}

export function useDeleteUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await deleteUsers(ids);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onMutate: async (ids) => {
      await queryClient.cancelQueries({queryKey : ["utilisateurs"]})
      
      const dataAncienne = queryClient.getQueryData<UtilisateurReponse>(["utilisateurs"])

      if(dataAncienne) queryClient.setQueryData<UtilisateurReponse>(["utilisateurs"] , {
        ...dataAncienne, 
        data : dataAncienne.data.filter((user) => !ids.includes(user.id))
      })

      return {dataAncienne}
    },
    onSuccess: (data, ids) => {
      toast.success(`${ids.length} utilisateur${ids.length > 1 ? "s" : ""} supprimé${ids.length > 1 ? "s" : ""}`)
    },

    onError: (error, variables, anciennevaleur) => {
      if(anciennevaleur?.dataAncienne){
        queryClient.setQueryData(["utilisateurs"], anciennevaleur.dataAncienne)
      }
      toast.error(`Erreur lors de la suppression d'utilisateurs`)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["utilisateurs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    }
  });
}

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
      const response = await axios.post("/api/modifier-role", {
        userId,
        newRole,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
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
      toast.error( "Erreur lors de la modification du rôle");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["utilisateurs"] });
    },
  });
};
