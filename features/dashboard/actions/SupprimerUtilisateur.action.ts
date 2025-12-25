import { prisma } from "@/prisma";
import { SessionAdmin } from "../../../lib/SessionAdmin";
import { Prisma } from "@/generated/client";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

interface DeleteResponse {
  success: boolean;
}

export const deleteUsers = createServerFn({ method: "POST" })
  .inputValidator(z.array(z.string()))
  .handler(async ({ data: ids }): Promise<DeleteResponse> => {
    try {
      await SessionAdmin();

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
