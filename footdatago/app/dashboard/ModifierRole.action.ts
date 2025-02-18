import { auth } from "@/auth";
import { prisma } from "@/prisma";

export type Role = "Admin" | "utilisateur";

export async function ModifierRole(userId: string, NewRole: Role) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      success: false,
      message: "Vous devez être connecté",
    };
  }

  const admin = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (admin?.role !== "Admin") {
    return {
      success: false,
      message: "Action non autorisée",
    };
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: NewRole },
  });

  return {
    success : true , 
    message : "Role changer avec succès "
  }
}
