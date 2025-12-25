import { prisma } from "@/prisma";
import { ModifierRoleInputSchema } from "../schemas/SchemaRole";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "@/auth";

export const ModifierRole = createServerFn({ method: "POST" })
  .inputValidator(ModifierRoleInputSchema)
  .handler(async ({ data: { id, newRole } }) => {
    try {
      const request = getRequest();
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      const sessionId = session?.user?.id;
      if (!sessionId) {
        throw new Error("Vous devez etre connecté");
      }

      const admin = await prisma.user.findUnique({
        where: {
          id: sessionId,
        },
        select: { role: true },
      });

      if (admin?.role !== "Admin") {
        throw new Error("Vous devez etre admin !");
      }

      await prisma.user.update({
        where: { id: id },
        data: { role: newRole },
      });

      return {
        success: true,
        message: "Role changé avec succès",
      };
    } catch (error) {
      return {
        success: false,
        message: "Erreur lors du changement de rôle",
      };
    }
  });
