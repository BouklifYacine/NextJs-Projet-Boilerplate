import ky from "ky";
import type {
  StatsResponse,
  UtilisateurReponse,
} from "../types/dashboard.types";

export const DashboardService = {
  /**
   * Get dashboard stats (revenue, users, subscriptions)
   */
  async getStats(): Promise<StatsResponse> {
    return ky.get("/api/dashboard/revenudetail").json<StatsResponse>();
  },

  /**
   * Get paginated list of users
   */
  async getUtilisateurs(page: number): Promise<UtilisateurReponse> {
    return ky
      .get(`/api/dashboard/totalutilisateur?page=${page}`)
      .json<UtilisateurReponse>();
  },
};
