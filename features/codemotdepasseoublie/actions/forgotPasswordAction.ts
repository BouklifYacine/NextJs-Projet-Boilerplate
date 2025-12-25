import { createServerFn } from "@tanstack/react-start";
import { prisma } from "@/prisma";
import CodeConfirmation from "@/emails/CodeConfirmation";
import React from "react";
import { Resend } from "resend";
import { z } from "zod";

export const forgotPasswordAction = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.string().email() }))
  .handler(async ({ data: { email } }) => {
    try {
      if (!process.env.RESEND_API_KEY) {
        throw new Error("Clé API Resend manquante");
      }
      const resend = new Resend(process.env.RESEND_API_KEY);

      const user = await prisma.user.findUnique({
        where: { email },
        include: { accounts: true },
      });

      if (!user) {
        throw new Error("Aucun compte n'est associé à cette adresse email");
      }

      if (
        user.accounts.length > 0 &&
        user.accounts[0].providerId !== "credential"
      ) {
        throw new Error(
          `Compte relié a ${user.accounts[0].providerId} impossible de changer de mot de passe`
        );
      }

      // Génère un code à 6 chiffres
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expirationcode = new Date(Date.now() + 3600000); // 1 heure

      await prisma.user.update({
        where: { email },
        data: {
          resetToken: resetCode,
          resetTokenExpiry: expirationcode,
        },
      });

      await resend.emails.send({
        from: "yacine@footygogo.com",
        to: email,
        subject: "Changement de mot de passe",
        react: React.createElement(CodeConfirmation, {
          resetCode,
          pseudo: user.email || "",
        }),
      });

      return { message: "Code envoyé par email dans les spams " };
    } catch (error) {
      console.error("Erreur API:", error);
      // Re-throw valid errors for client handling
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erreur serveur");
    }
  });
