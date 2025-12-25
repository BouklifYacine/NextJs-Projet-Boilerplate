import { createServerFn } from "@tanstack/react-start";
import { prisma } from "@/prisma";
import { ResetPasswordSchema } from "../schemas/SchemaMotDepasse";
import { HashPassword } from "@/lib/argon2";
import React from "react";
import NotifChangementMotDePasse from "@/emails/NotifChangementMotDePasse";
import { Resend } from "resend";

export const confirmPasswordResetAction = createServerFn({ method: "POST" })
  .inputValidator(ResetPasswordSchema)
  .handler(async ({ data: { code, email, newPassword } }) => {
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
        throw new Error("Cet email est incorrect");
      }

      if (user.resetToken !== code) {
        throw new Error("Code invalide");
      }

      if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
        throw new Error("Code expiré");
      }

      const account = user.accounts[0];
      if (!account) {
        throw new Error("Aucun compte associé à cet utilisateur");
      }

      const hashedPassword = await HashPassword(newPassword);

      await prisma.$transaction([
        prisma.account.update({
          where: { id: account.id },
          data: { password: hashedPassword },
        }),
        prisma.user.update({
          where: { id: user.id },
          data: {
            resetToken: null,
            resetTokenExpiry: null,
          },
        }),
      ]);

      await resend.emails.send({
        from: "yacine@footygogo.com",
        to: email,
        subject: "Mot de passe mis à jour",
        react: React.createElement(NotifChangementMotDePasse, {
          pseudo: user.name || user.email || "",
        }),
      });

      return { message: "Mot de passe mis à jour" };
    } catch (error) {
      console.error("Erreur API:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erreur serveur");
    }
  });
