import { useSuspenseQuery } from "@tanstack/react-query";
import { getStatsAction } from "../actions/getStatsAction";
import type { StatsResponse } from "../types/dashboard.types";

export function useStats() {
  return useSuspenseQuery<StatsResponse>({
    queryKey: ["stats"],
    queryFn: async (): Promise<StatsResponse> => {
      const response = await getStatsAction();
      return response;
    },
  });
}
