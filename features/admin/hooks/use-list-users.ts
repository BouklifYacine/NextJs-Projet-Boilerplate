import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { adminKeys } from "./admin-keys";
import type { ListUsersFilter } from "../schemas/admin-schemas";
import { getUsers } from "../server/admin.server";

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
  banned: boolean;
  banReason: string | null;
  banExpires: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ListUsersResponse {
  users: User[];
  total: number;
}

/**
 * Hook for listing users with filters.
 */
export function useListUsers(filters: Partial<ListUsersFilter> = {}) {
  const { page = 1, limit = 10, search, role, banned } = filters;

  return useQuery({
    queryKey: adminKeys.usersList({ page, limit, search, role, banned }),
    queryFn: async (): Promise<ListUsersResponse> => {
      // Cast the server function specifically for this call to satisfy the DataType constraint
      const response = await (getUsers as any)({
        data: {
          page,
          limit,
          search,
          role,
          banned,
        },
      });

      return response as unknown as ListUsersResponse;
    },
    placeholderData: keepPreviousData,
  });
}
