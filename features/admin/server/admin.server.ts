import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import {
  banUserSchema,
  setRoleSchema,
  listUsersFilterSchema,
  userIdSchema,
} from "../schemas/admin-schemas";
import { userRepository } from "../repositories/user.repository";
import {
  requireAdmin,
  serializeUser,
  calculateBanExpiration,
} from "../utils/admin.utils";
import type {
  ListUsersResponse,
  AdminActionResult,
  AdminUserSerialized,
} from "../types/admin-types";

// ============================================================================
// Query: List Users
// ============================================================================

/**
 * Server function to list users with filtering and pagination
 */
export const getUsers = createServerFn({ method: "GET" })
  .inputValidator(zodValidator(listUsersFilterSchema.partial()))
  .handler(async ({ data }): Promise<ListUsersResponse> => {
    await requireAdmin();

    const { users, total } = await userRepository.findMany(data);

    return {
      users: users.map(serializeUser),
      total,
    };
  });

// ============================================================================
// Mutations: User Management
// ============================================================================

/**
 * Server function to ban a user
 */
export const banUser = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(banUserSchema))
  .handler(
    async ({ data }): Promise<AdminActionResult<AdminUserSerialized>> => {
      await requireAdmin();

      const banExpires = calculateBanExpiration(data.banExpiresIn);

      const user = await userRepository.updateBanStatus(data.userId, {
        banned: true,
        banReason: data.banReason,
        banExpires,
      });

      await userRepository.deleteUserSessions(data.userId);

      return { success: true, user: serializeUser(user) };
    }
  );

/**
 * Server function to unban a user
 */
export const unbanUser = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(userIdSchema))
  .handler(
    async ({ data }): Promise<AdminActionResult<AdminUserSerialized>> => {
      await requireAdmin();

      const user = await userRepository.updateBanStatus(data.userId, {
        banned: false,
        banReason: null,
        banExpires: null,
      });

      return { success: true, user: serializeUser(user) };
    }
  );

/**
 * Server function to set user role
 */
export const setUserRole = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(setRoleSchema))
  .handler(
    async ({ data }): Promise<AdminActionResult<AdminUserSerialized>> => {
      await requireAdmin();

      const user = await userRepository.updateRole(data.userId, data.role);

      return { success: true, user: serializeUser(user) };
    }
  );

/**
 * Server function to remove a user
 */
export const removeUser = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(userIdSchema))
  .handler(async ({ data }): Promise<AdminActionResult> => {
    await requireAdmin();

    await userRepository.deleteWithRelations(data.userId);

    return { success: true };
  });
