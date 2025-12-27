/**
 * Role type matching Prisma enum
 */
export type UserRole = "Admin" | "utilisateur";

/**
 * Plan type matching Prisma enum
 */
export type UserPlan = "free" | "pro";

/**
 * User type for admin views
 */
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: UserRole;
  plan: UserPlan;
  banned: boolean;
  banReason: string | null;
  banExpires: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Paginated response for user listing
 */
export interface PaginatedUsersResponse {
  users: AdminUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Admin action result
 */
export interface AdminActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}
