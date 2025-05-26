import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { HashPassword, verifyPassword } from "@/lib/argon2";

export async function POST(request: NextRequest) {
  try {
    const { email, motdepasseactuel, nouveaumotdepasse } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    });

    if (!user || !user.accounts.length) {
      return NextResponse.json(
        { message: "Compte non trouvé" },
        { status: 404 }
      );
    }

    const account = user.accounts[0];

    if (!account.password) {
      return NextResponse.json(
        { message: "Mot de passe non défini pour ce compte" },
        { status: 404 }
      );
    }

    if (account.providerId !== "credential") {
      return NextResponse.json({
        message: `Vous ne pouvez pas changer de compte avec ${account.providerId}`,
      });
    }

    const MotdePasseValide = await verifyPassword({
      password: motdepasseactuel,
      hash: account.password,
    });

    if (!MotdePasseValide) {
      return NextResponse.json(
        { message: "Mot de passe actuel incorrect" },
        { status: 400 }
      );
    }

    const MotDePasseHache = await HashPassword(nouveaumotdepasse);

    await prisma.account.update({
      where: { id: account.id },
      data: {
        password: MotDePasseHache,
      },
    });

    return NextResponse.json({ message: "Mot de passe mis à jour" });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "erreur serveur" },
      { status: 500 }
    );
  }
}
