import { auth } from "@/auth";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const subscriptionMiddleware = createMiddleware().server(
  async ({ next }) => {
    const headers = getRequestHeaders();

    const session = await auth.api.getSession({ headers });

    if (!session?.user) {
      throw redirect({ to: "/connexion" });
    }

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
