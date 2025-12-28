import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { adminKeys } from "./admin-keys";
import type { ListUsersFilter } from "../schemas/admin-schemas";
import { getUsers } from "../server/admin.server";
import { ListUsersResponse } from "../types/admin-types";

/**
 * Hook for listing users with filters.
 */
export function useListUsers(filters: Partial<ListUsersFilter> = {}) {
  const { page = 1, limit = 10, search, role, banned } = filters;

  return useQuery<ListUsersResponse>({
    queryKey: adminKeys.usersList({ page, limit, search, role, banned }),
    queryFn: () => getUsers({ data: { page, limit, search, role, banned } }),
    placeholderData: keepPreviousData,
  });
}
