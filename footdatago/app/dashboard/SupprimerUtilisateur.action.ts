'use server'

import { auth } from "@/auth";
import { prisma } from "@/prisma";

interface DeleteResponse {
  success: boolean;
  message: string;
}

export async function deleteUsers(ids: string[]): Promise<DeleteResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "Vous devez être connecté"
      };
    }

    const admin = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });

    if (admin?.role !== "Admin") {
      return {
        success: false,
        message: "Action non autorisée"
      };
    }

   
    await prisma.$transaction(async (tx) => {
      
      await tx.session.deleteMany({
        where: { userId: { in: ids } }
      });

      await tx.account.deleteMany({
        where: { userId: { in: ids } }
      });

      await tx.authenticator.deleteMany({
        where: { userId: { in: ids } }
      });

      await tx.abonnement.deleteMany({
        where: { userId: { in: ids } }
      });

      await tx.user.deleteMany({
        where: { id: { in: ids } }
      });
    });

    return {
      success: true,
      message: "Utilisateurs supprimés avec succès"
    };
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return {
      success: false,
      message: "Erreur lors de la suppression des utilisateurs"
    };
  }
}