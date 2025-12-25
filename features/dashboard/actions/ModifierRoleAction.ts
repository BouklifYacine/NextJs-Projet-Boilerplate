import { prisma } from "@/prisma";
import { SessionAdmin } from "../../../lib/SessionAdmin";
import { ModifierRoleInputSchema } from "../schemas/SchemaRole";
import { createServerFn } from "@tanstack/react-start";

export const ModifierRole = createServerFn({ method: "POST" })
  .inputValidator(ModifierRoleInputSchema)
  .handler(async ({ data: { id, newRole } }) => {
    try {
      await SessionAdmin();

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
