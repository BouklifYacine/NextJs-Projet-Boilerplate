"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function UtilisateurAdmin() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Tu n'es pas connecté fréro");

  const utilisateurexistant = await prisma.user.findUnique({
    where: { id: session.user?.id },
    select: {
      role: true,
    },
  });

  if (!utilisateurexistant) return { success: false };

  return { success: true, Admin: utilisateurexistant.role === "Admin" };
}
