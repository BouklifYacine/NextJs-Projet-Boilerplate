import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, motdepasseactuel, nouveaumotdepasse } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    });

    if (!user?.password) {
      return NextResponse.json(
        { message: "Compte non trouvé" },
        { status: 404 }
      );
    }

    const MotdePasseValide = await bcrypt.compare(
      motdepasseactuel,
      user.password
    );
    if (!MotdePasseValide) {
      return NextResponse.json(
        { message: "Mot de passe actuel incorrect" },
        { status: 400 }
      );
    }

    const ctx = await auth.$context;
    const MotDePasseHache = await ctx.password.hash(nouveaumotdepasse);

    const account = await prisma.account.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (account) {
      await prisma.account.update({
        where: { id: account.id },
        data: {
          password: MotDePasseHache,
        },
      });
    }
    return NextResponse.json({ message: "Mot de passe mis à jour" });
  } catch (error) {
    return NextResponse.json(
      { message: error || "erreur serveur" },
      { status: 500 }
    );
  }
}
