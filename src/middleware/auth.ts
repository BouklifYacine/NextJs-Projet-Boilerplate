import { auth } from "@/auth";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

/**
 * Middleware Auth - Vérifie si l'utilisateur est connecté
 * Passe l'utilisateur dans le context pour les middlewares suivants
 */
export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });

  if (!session?.user) {
    throw redirect({ to: "/connexion" });
  }

  return next({ context: { user: session.user } });
});
