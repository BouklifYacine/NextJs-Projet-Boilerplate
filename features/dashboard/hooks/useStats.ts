import { useQuery } from "@tanstack/react-query";
import { getStatsAction } from "../actions/getStatsAction";
import type { StatsResponse } from "../types/dashboard.types";

export function useStats() {
  return useQuery<StatsResponse>({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await getStatsAction();
      return response as StatsResponse;
    },
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
}
