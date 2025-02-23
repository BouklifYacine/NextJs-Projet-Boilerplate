"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function AdminAction() {
  const session = await auth();
  const sessionID = session?.user?.id;

  if (!sessionID) throw new Error("Vous n'avez pas de session ID")

  const utilisateur = await prisma.user.findUnique({
    where: { id: sessionID },
  });
  if (utilisateur?.role !== "Admin") throw new Error("Vous n'etes pas admin")

  return { success: true, Admin: utilisateur.role === "Admin" };
}
