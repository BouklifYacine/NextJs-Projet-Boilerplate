import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

export function useUtilisateurs() {
  return useQuery<UtilisateurReponse, Error>({
    queryKey: ["utilisateurs"],
    queryFn: async () => {
      const { data } = await axios.get("/api/totalutilisateur");
      return data;
    },
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
}
