import { auth } from "@/auth";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

/**
 * Middleware Subscription - Vérifie si l'utilisateur a un abonnement actif
 * À utiliser APRÈS authMiddleware: middleware: [authMiddleware, subscriptionMiddleware]
 */
export const subscriptionMiddleware = createMiddleware().server(
  async ({ next, context }) => {
    const headers = getRequestHeaders();

    // Récupère la session avec les données utilisateur
    const session = await auth.api.getSession({ headers });

    if (!session?.user) {
      throw redirect({ to: "/connexion" });
    }

    // Vérifie si l'utilisateur a un abonnement actif
    // Adapte selon ton modèle de données (isSubscribed, subscriptionStatus, etc.)
    const user = session.user as {
      isSubscribed?: boolean;
      subscriptionStatus?: string;
    };

    if (!user.isSubscribed && user.subscriptionStatus !== "active") {
      throw redirect({ to: "/" });
    }

    return next({ context: { user: session.user, hasSubscription: true } });
  }
);
