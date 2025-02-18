import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

export function useStats() {
  return useQuery<StatsResponse>({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await axios.get("/api/revenudetail");
      return data;
    },
    retry : 2,
    staleTime: 1000 * 60 * 5,
  });
}
