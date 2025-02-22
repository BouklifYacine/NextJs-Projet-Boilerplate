"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

export async function AdminAction() {
  const session = await auth();
  const sessionID = session?.user?.id;

  if (!sessionID) redirect("/");

  const utilisateur = await prisma.user.findUnique({
    where: { id: sessionID },
  });
  if (utilisateur?.role !== "Admin") redirect("/");

  return { success: true, Admin: utilisateur.role === "Admin" };
}
