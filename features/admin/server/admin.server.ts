import { createServerFn } from "@tanstack/react-start";
import { prisma } from "@/prisma";
import { auth } from "@/auth";
import { getRequest } from "@tanstack/react-start/server";
import {
  banUserSchema,
  setRoleSchema,
  listUsersFilterSchema,
} from "../schemas/admin-schemas";
import { z } from "zod";

/**
 * Helper to check admin role in Server Functions
 */
async function checkAdmin() {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user?.id) {
    throw new Error("Session introuvable");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (user?.role !== "Admin") {
    throw new Error("Action non autorisée : Droits administrateur requis");
  }

  return { session, request };
}

/**
 * Server function to list users with filtration and pagination
 */
export const getUsers = createServerFn({ method: "GET" })
  .inputValidator((d: any) => listUsersFilterSchema.partial().parse(d))
  .handler(async ({ data }) => {
    await checkAdmin();

    const { page = 1, limit = 10, search, role, banned } = data;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ];
    }

    if (role) {
      where.role = role;
    }

    if (banned !== undefined) {
      where.banned = banned;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ]);

    // Format for serialization
    return {
      users: users.map((user) => ({
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        banExpires: user.banExpires ? user.banExpires.toISOString() : null,
      })),
      total,
    };
  });

/**
 * Server function to ban a user (using Prisma direct)
 */
export const banUser = createServerFn({ method: "POST" })
  .inputValidator((d: any) => banUserSchema.parse(d))
  .handler(async ({ data }) => {
    await checkAdmin();
    const validated = data;

    // Update user in DB
    const user = await prisma.user.update({
      where: { id: validated.userId },
      data: {
        banned: true,
        banReason: validated.banReason,
        banExpires: validated.banExpiresIn
          ? new Date(Date.now() + validated.banExpiresIn * 1000)
          : null,
      },
    });

    // Revoke all sessions for the banned user
    await prisma.session.deleteMany({
      where: { userId: validated.userId },
    });

    return { success: true, user };
  });

/**
 * Server function to unban a user (using Prisma direct)
 */
export const unbanUser = createServerFn({ method: "POST" })
  .inputValidator((d: any) => z.object({ userId: z.string() }).parse(d))
  .handler(async ({ data }) => {
    await checkAdmin();
    const { userId } = data;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        banned: false,
        banReason: null,
        banExpires: null,
      },
    });

    return { success: true, user };
  });

/**
 * Server function to set user role (using Prisma direct)
 */
export const setUserRole = createServerFn({ method: "POST" })
  .inputValidator((d: any) => setRoleSchema.parse(d))
  .handler(async ({ data }) => {
    await checkAdmin();
    const { userId, role } = data;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        role: role as any, // Cast to enum
      },
    });

    return { success: true, user };
  });

/**
 * Server function to remove a user (using Prisma direct)
 */
export const removeUser = createServerFn({ method: "POST" })
  .inputValidator((d: any) => z.object({ userId: z.string() }).parse(d))
  .handler(async ({ data }) => {
    await checkAdmin();
    const { userId } = data;

    // Delete accounts, sessions, and finally user
    await prisma.$transaction([
      prisma.account.deleteMany({ where: { userId } }),
      prisma.session.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);

    return { success: true };
  });

/**
 * Server function to impersonate a user
 */
export const impersonateUser = createServerFn({ method: "POST" })
  .inputValidator((d: any) => z.object({ userId: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const { request } = await checkAdmin();
    const { userId } = data;

    // Try to find the impersonateUser method - if auth.api.admin is missing, we try auth.api directly
    const impersonate =
      (auth.api as any).admin?.impersonateUser ||
      (auth.api as any).impersonateUser;

    if (!impersonate) {
      throw new Error("Méthode impersonateUser de Better Auth introuvable");
    }

    return await impersonate({
      headers: request.headers,
      body: { userId },
    });
  });

/**
 * Server function to stop impersonating
 */
export const stopImpersonation = createServerFn({ method: "POST" }).handler(
  async () => {
    const { request } = await checkAdmin();

    const stop =
      (auth.api as any).admin?.stopImpersonating ||
      (auth.api as any).stopImpersonating;

    if (!stop) {
      throw new Error("Méthode stopImpersonating de Better Auth introuvable");
    }

    return await stop({
      headers: request.headers,
    });
  }
);
