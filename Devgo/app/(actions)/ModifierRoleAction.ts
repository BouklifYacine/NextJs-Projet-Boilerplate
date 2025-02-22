"use server";

import { prisma } from "@/prisma";
import { SessionAdmin } from "../utils/SessionAdmin";
import { revalidatePath } from "next/cache";

export async function ModifierRole(
  id: string,
  newRole: "Admin" | "utilisateur"
) {
  await SessionAdmin();

  await prisma.user.update({
    where: { id: id },
    data: { role: newRole },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/parametres/${id}`);

  return {
    success: true,
    message: "Role changé avec succès",
  };
}
