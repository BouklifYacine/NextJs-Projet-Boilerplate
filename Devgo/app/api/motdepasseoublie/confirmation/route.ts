import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { ResetPasswordSchema } from "@/app/(schema)/SchemaMotDepasse";
import { HashPassword } from "@/lib/argon2";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = ResetPasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { code, email, newPassword } = body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Cet email est incorrect" },
        { status: 400 }
      );
    }

    if (user.resetToken !== code) {
      return NextResponse.json(
        { message: "Code invalide" },
        { status: 400 }
      );
    }

    if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return NextResponse.json(
        { message: "Code expiré" },
        { status: 400 }
      );
    }

    const account = user.accounts[0];
    if (!account) {
      return NextResponse.json(
        { message: "Aucun compte associé à cet utilisateur" },
        { status: 400 }
      );
    }

    const hashedPassword = await HashPassword(newPassword);

    await prisma.$transaction([
      prisma.account.update({
        where: { id: account.id },
        data: { password: hashedPassword },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken: null,
          resetTokenExpiry: null,
        },
      }),
    ]);

    return NextResponse.json({ message: "Mot de passe mis à jour" });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "erreur serveur" },
      { status: 500 }
    );
  }
}
