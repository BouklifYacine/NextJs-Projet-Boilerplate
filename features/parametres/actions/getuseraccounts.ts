import { prisma } from "@/prisma";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getUserAccounts = createServerFn({ method: "GET" })
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data: { userId } }) => {
    try {
      if (!userId) {
        throw new Error("UserId est requis");
      }

      const utilisateur = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          name: true,
          email: true,
          plan: true,
          image: true,
          abonnement: {
            select: {
              periode: true,
              datedebut: true,
              datefin: true,
            },
          },
          accounts: {
            select: {
              providerId: true,
            },
          },
        },
      });

      if (!utilisateur) {
        throw new Error("Utilisateur non trouvé");
      }

      const providerId =
        utilisateur.accounts?.map((acc) => acc.providerId) || [];
      const safeAbonnement = utilisateur.abonnement
        ? {
            periode: utilisateur.abonnement.periode,
            datedebut: utilisateur.abonnement.datedebut,
            datefin: utilisateur.abonnement.datefin,
          }
        : null;

      return {
        message: "Données utilisateur récupérées avec succès",
        email: utilisateur.email,
        pseudo: utilisateur.name,
        plan: utilisateur.plan,
        image: utilisateur.image,
        abonnement: safeAbonnement,
        providerId,
      };
    } catch (error) {
      console.error("Erreur API:", error);
      throw new Error("Erreur interne du serveur");
    }
  });
