/**
 * Query key factory for admin feature
 */
export const adminKeys = {
  all: ["admin"] as const,
  users: () => [...adminKeys.all, "users"] as const,
  usersList: (filters: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    banned?: boolean;
  }) => [...adminKeys.users(), "list", filters] as const,
  user: (id: string) => [...adminKeys.users(), "detail", id] as const,
} as const;
