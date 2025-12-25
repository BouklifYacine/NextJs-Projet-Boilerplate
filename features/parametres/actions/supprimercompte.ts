import { prisma } from "@/prisma";
import { sendEmail } from "@/emails/email";
import { createElement } from "react";
import EmailSuppressionCompte from "@/emails/SuppressionCompte";
import { auth } from "@/auth";
import { VerifierElement } from "@/lib/argon2";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

export const supprimerCompte = createServerFn({ method: "POST" })
  .inputValidator(z.string().optional())
  .handler(async ({ data: codeVerification }) => {
    try {
      const request = getRequest();
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      if (!session?.user?.id) {
        throw new Error("Non autorisé");
      }

      const utilisateur = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { accounts: true },
      });

      if (!utilisateur) {
        throw new Error("Utilisateur non trouvé");
      }

      const hasProvider = utilisateur.accounts.length > 0;

      // Si c'est un compte normal (sans provider) et qu'il n'y a pas de code
      if (!hasProvider && !codeVerification) {
        throw new Error("Code de vérification requis");
      }

      // Vérifier le code uniquement pour les comptes sans provider
      if (!hasProvider) {
        const TokenValide =
          utilisateur?.resetTokenExpiry &&
          utilisateur.resetTokenExpiry > new Date();
        const codevalide = await VerifierElement(
          codeVerification || "",
          utilisateur?.resetToken || ""
        );
        if (!TokenValide || !codevalide)
          throw new Error("Code de vérification invalide ou expiré");
      }

      try {
        await prisma.$transaction(async (db) => {
          await db.session.deleteMany({
            where: { userId: session?.user?.id },
          });

          await db.account.deleteMany({
            where: { userId: session?.user?.id },
          });

          if (utilisateur.clientId) {
            try {
              await db.abonnement.deleteMany({
                where: { userId: session?.user?.id },
              });
            } catch (error) {
              console.error(
                "Erreur lors de la suppression de l'abonnement:",
                error
              );
            }
          }

          // Envoyer les mails avant la suppression pour anticiper une erreur
          if (utilisateur.email) {
            await sendEmail({
              to: utilisateur.email,
              subject: "Compte supprimé",
              emailComponent: createElement(EmailSuppressionCompte, {
                pseudo: utilisateur.name || "Pseudo inconnu",
              }),
            });
          }

          await db.user.delete({
            where: { id: session?.user?.id },
          });
        });

        // La déconnexion est gérée côté client après le succès de cette action

        return { success: true };
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        throw new Error(
          "Une erreur est survenue lors de la suppression du compte"
        );
      }
    } catch (error) {
      return { error: (error as Error).message };
    }
  });
