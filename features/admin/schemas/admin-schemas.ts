import { z } from "zod";

/**
 * Reusable userId schema
 */
export const userIdSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

/**
 * Schema for banning a user
 */
export const banUserSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  banReason: z.string().optional(),
  banExpiresIn: z.number().positive().optional(),
});

export type BanUserInput = z.infer<typeof banUserSchema>;

/**
 * Schema for setting user role
 */
export const setRoleSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  role: z.enum(["Admin", "utilisateur"]),
});

export type SetRoleInput = z.infer<typeof setRoleSchema>;

/**
 * Schema for user list filters
 */
export const listUsersFilterSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  role: z.enum(["Admin", "utilisateur"]).optional(),
  banned: z.boolean().optional(),
  search: z.string().optional(),
});

export type ListUsersFilter = z.infer<typeof listUsersFilterSchema>;

// Note: AdminUser and ListUsersResponse types are defined in types/admin-types.ts

/**
 * Schema for creating a user (admin)
 */
export const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
  role: z.enum(["Admin", "utilisateur"]).default("utilisateur"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
