import { prisma } from "@/prisma";
import { Prisma } from "@/generated/client";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "@/auth";

interface DeleteResponse {
  success: boolean;
}

export const deleteUsers = createServerFn({ method: "POST" })
  .inputValidator(z.array(z.string()))
  .handler(async ({ data: ids }): Promise<DeleteResponse> => {
    try {
      const request = getRequest();
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      const sessionId = session?.user?.id;
      if (!sessionId) {
        throw new Error("Vous devez etre connecté");
      }

      const admin = await prisma.user.findUnique({
        where: {
          id: sessionId,
        },
        select: { role: true },
      });

      if (admin?.role !== "Admin") {
        throw new Error("Vous devez etre admin !");
      }

      await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        await tx.session.deleteMany({
          where: { userId: { in: ids } },
        });

        await tx.account.deleteMany({
          where: { userId: { in: ids } },
        });

        await tx.abonnement.deleteMany({
          where: { userId: { in: ids } },
        });

        await tx.user.deleteMany({
          where: { id: { in: ids } },
        });
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      return {
        success: false,
      };
    }
  });
