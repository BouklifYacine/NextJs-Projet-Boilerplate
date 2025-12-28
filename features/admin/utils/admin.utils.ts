import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { getRequest } from "@tanstack/react-start/server";
import type { AdminUserSerialized } from "../types/admin-types";

// ============================================================================
// Auth Utilities
// ============================================================================

/**
 * Error thrown when admin access is denied
 */
export class AdminAccessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AdminAccessError";
  }
}

/**
 * Validates that the current request is from an authenticated admin user.
 * Throws AdminAccessError if validation fails.
 */
export async function requireAdmin(): Promise<{ userId: string }> {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user?.id) {
    throw new AdminAccessError("Session not found");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (user?.role !== "Admin") {
    throw new AdminAccessError("Unauthorized: Admin rights required");
  }

  return { userId: session.user.id };
}

// ============================================================================
// Serialization Utilities
// ============================================================================

interface UserWithDates {
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
 * Serializes a user object for client consumption.
 * Converts Date objects to ISO strings.
 */
export function serializeUser(user: UserWithDates): AdminUserSerialized {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
    banned: user.banned,
    banReason: user.banReason,
    banExpires: user.banExpires?.toISOString() ?? null,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

/**
 * Calculates ban expiration date from seconds
 */
export function calculateBanExpiration(expiresInSeconds?: number): Date | null {
  if (!expiresInSeconds) return null;
  return new Date(Date.now() + expiresInSeconds * 1000);
}
