"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

export async function UtilisateurAdmin() {
  const session = await auth();
  if (!session) redirect("/");

  const utilisateurexistant = await prisma.user.findUnique({
    where: { id: session.user?.id },
    select: {
      role: true,
    },
  });

  if (!utilisateurexistant) return { success: false };

  return { success: true, Admin: utilisateurexistant.role === "Admin" };
}
