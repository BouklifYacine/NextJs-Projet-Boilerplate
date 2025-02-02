import { z } from "zod";

export const ResetPasswordSchema = z.object({
  code: z.string(),
  email: z.string(),
  newPassword: z
    .string({ message: "Vous devez mettre un mot de passe" })
    .min(1, { message: "Vous devez mettre un mot de passe" })
    .min(6, "Le mot de passe doit faire au minimum 6 caractères")
    .trim()
    .max(35, "Le mot de passe doit faire au maximum 35 caractères"),
});
