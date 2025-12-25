import { z } from "zod";
import SchemaInscription from "@/features/inscription/schemas/SchemaInscription";
import { prisma } from "@/prisma";
import EmailBienvenue from "@/emails/EmailBienvenue";
import { auth } from "@/auth";
import React from "react";
import { Resend } from "resend";
import { createServerFn } from "@tanstack/react-start";

type Schema = z.infer<typeof SchemaInscription>;

export const inscriptionAction = createServerFn({ method: "POST" })
  .inputValidator(SchemaInscription)
  .handler(async ({ data }) => {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const emailutilisateur = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (emailutilisateur) {
        return {
          success: false,
          error: "Cet email est déja utilisé",
        };
      }

      const nomutilisateur = await prisma.user.findUnique({
        where: { name: data.name },
      });

      if (nomutilisateur) {
        return {
          success: false,
          error: "Ce pseudo est déja utilisé",
        };
      }

      await resend.emails.send({
        from: "yacine@footygogo.com",
        to: data.email,
        subject: "Bienvenue",
        react: React.createElement(EmailBienvenue, { name: data.name }),
      });

      // Use Better Auth server-side API to create the user
      await auth.api.signUpEmail({
        body: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });

      return {
        success: true,
        data: {
          name: data.name,
          message: "Inscription réussie",
        },
      };
    } catch (error) {
      console.error("Inscription error:", error);
      return {
        success: false,
        error: "Une erreur est survenue lors de l'inscription",
      };
    }
  });
