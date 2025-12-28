/**
 * Role type matching Prisma enum
 */
export type UserRole = "Admin" | "utilisateur";

/**
 * Plan type matching Prisma enum
 */
export type UserPlan = "free" | "pro";

/**
 * User type for admin views (internal, with Date objects)
 */
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
  banned: boolean;
  banReason: string | null;
  banExpires: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Serialized user type for API responses (with ISO string dates)
 */
export interface AdminUserSerialized {
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

/**
 * Paginated response for user listing
 */
export interface ListUsersResponse {
  users: AdminUserSerialized[];
  total: number;
}

/**
 * Admin action result with typed data
 */
export interface AdminActionResult<T = undefined> {
  success: boolean;
  user?: T;
}
