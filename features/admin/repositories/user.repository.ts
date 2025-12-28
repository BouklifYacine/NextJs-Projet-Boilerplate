import { prisma } from "@/prisma";
import type { Prisma } from "@/generated/client";
import type { ListUsersFilter } from "../schemas/admin-schemas";

// ============================================================================
// Types
// ============================================================================

/**
 * Fields selected for admin user views
 */
const ADMIN_USER_SELECT = {
  id: true,
  name: true,
  email: true,
  image: true,
  role: true,
  banned: true,
  banReason: true,
  banExpires: true,
  createdAt: true,
  updatedAt: true,
} as const;

type AdminUserSelectResult = Prisma.UserGetPayload<{
  select: typeof ADMIN_USER_SELECT;
}>;

// ============================================================================
// Query Builders
// ============================================================================

/**
 * Builds a Prisma where clause for user filtering
 */
function buildUserWhereClause(
  filters: Partial<ListUsersFilter>
): Prisma.UserWhereInput {
  const where: Prisma.UserWhereInput = {};

  if (filters.search) {
    where.OR = [
      { email: { contains: filters.search, mode: "insensitive" } },
      { name: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters.role) {
    where.role = filters.role;
  }

  if (filters.banned !== undefined) {
    where.banned = filters.banned;
  }

  return where;
}

// ============================================================================
// Repository Interface
// ============================================================================

export interface IUserRepository {
  findMany(filters: Partial<ListUsersFilter>): Promise<{
    users: AdminUserSelectResult[];
    total: number;
  }>;
  findById(userId: string): Promise<AdminUserSelectResult | null>;
  updateBanStatus(
    userId: string,
    data: {
      banned: boolean;
      banReason?: string | null;
      banExpires?: Date | null;
    }
  ): Promise<AdminUserSelectResult>;
  updateRole(
    userId: string,
    role: "Admin" | "utilisateur"
  ): Promise<AdminUserSelectResult>;
  deleteWithRelations(userId: string): Promise<void>;
  deleteUserSessions(userId: string): Promise<void>;
}

// ============================================================================
// Repository Implementation
// ============================================================================

export const userRepository: IUserRepository = {
  /**
   * Find users with pagination and filtering
   */
  async findMany(filters: Partial<ListUsersFilter>) {
    const { page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;
    const where = buildUserWhereClause(filters);

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: ADMIN_USER_SELECT,
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total };
  },

  /**
   * Find a single user by ID
   */
  async findById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: ADMIN_USER_SELECT,
    });
  },

  /**
   * Update user ban status
   */
  async updateBanStatus(userId, data) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        banned: data.banned,
        banReason: data.banReason ?? null,
        banExpires: data.banExpires ?? null,
      },
      select: ADMIN_USER_SELECT,
    });
  },

  /**
   * Update user role
   */
  async updateRole(userId, role) {
    return prisma.user.update({
      where: { id: userId },
      data: { role },
      select: ADMIN_USER_SELECT,
    });
  },

  /**
   * Delete user and all related data in a transaction
   */
  async deleteWithRelations(userId: string) {
    await prisma.$transaction([
      prisma.account.deleteMany({ where: { userId } }),
      prisma.session.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);
  },

  /**
   * Delete all sessions for a user (used when banning)
   */
  async deleteUserSessions(userId: string) {
    await prisma.session.deleteMany({ where: { userId } });
  },
};
