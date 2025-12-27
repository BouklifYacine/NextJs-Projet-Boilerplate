import { z } from "zod";
import { SchemaConnexion } from "@/features/connexion/schemas/SchemaConnexion";
import { auth } from "@/auth";
import { createServerFn } from "@tanstack/react-start";

type Schema = z.infer<typeof SchemaConnexion>;

export const connexionAction = createServerFn({ method: "POST" })
  .inputValidator(SchemaConnexion)
  .handler(async ({ data }) => {
    try {
      const result = await auth.api.signInEmail({
        body: {
          email: data.email,
          password: data.password,
        },
      });

      if (!result) {
        return {
          success: false,
          error: "Email ou mot de passe incorrect",
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return {
        success: false,
        error: "Email ou mot de passe incorrect",
      };
    }
  });
