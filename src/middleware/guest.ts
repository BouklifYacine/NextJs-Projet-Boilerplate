import { auth } from "@/auth";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

/**
 * Middleware Guest - Redirige les utilisateurs déjà connectés
 * À utiliser sur les pages login/register/forgot-password
 */
export const guestMiddleware = createMiddleware().server(async ({ next }) => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });

  // Si l'utilisateur est déjà connecté, redirige vers l'accueil
  if (session?.user) {
    throw redirect({ to: "/" });
  }

  return next();
});
