import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { authMiddleware } from "@/src/middleware";
import { z } from "zod";
import { redirect } from "@tanstack/react-router";
import { auth } from "@/auth";

export const checkParametresAccess = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data: { userId } }) => {
    const request = getRequest();
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      throw redirect({
        to: "/connexion",
      });
    }

    if (session.user.id !== userId) {
      throw redirect({
        to: "/parametres/$userId",
        params: { userId: session.user.id },
      });
    }

    return null;
  });
