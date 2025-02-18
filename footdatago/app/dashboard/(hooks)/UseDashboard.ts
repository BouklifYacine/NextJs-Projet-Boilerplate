import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { deleteUsers } from "../SupprimerUtilisateur.action";

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
  role: "Admin" | "User";
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
}

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

export function useUtilisateurs() {
  return useQuery<UtilisateurReponse>({
    queryKey: ["utilisateurs"],
    queryFn: async () => {
      const {data} = await axios.get<UtilisateurReponse>("/api/totalutilisateur");
      return data;
    },
    retry: 2,
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
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ['utilisateurs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}