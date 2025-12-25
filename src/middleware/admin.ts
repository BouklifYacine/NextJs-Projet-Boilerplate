import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { authMiddleware } from "./auth";
import { prisma } from "@/prisma";

export const adminMiddleware = createMiddleware()
  .middleware([authMiddleware])
  .server(async ({ next, context }) => {
    const user = await prisma.user.findUnique({
      where: { id: context.user.id },
      select: { id: true, role: true },
    });

    if (!user || user.role !== "Admin") {
      throw redirect({ to: "/" });
    }

    return next({ context: { dbUser: user } });
  });
