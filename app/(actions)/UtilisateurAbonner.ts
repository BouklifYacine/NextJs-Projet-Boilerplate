import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";

export const UtilisateurAbonner = createServerFn().handler(async () => {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user?.id) {
    throw redirect({ to: "/" });
  }

  const utilisateurexistant = await prisma.user.findUnique({
    where: { id: session.user?.id },
  });

  if (!utilisateurexistant) return { success: false };

  return { success: true, abonner: utilisateurexistant.plan === "pro" };
});
