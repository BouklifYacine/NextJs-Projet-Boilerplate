import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "UserId is required" }, { status: 400 });
  }

  try {
    const utilisateur = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name : true, 
        email : true,
        plan: true,
        abonnement: {
          select: {
            periode: true,
            datedebut: true,
            datefin: true,
          },
        },
        accounts: {
          select: {
            providerId: true,
          },
        },
      },
    });

    if (!utilisateur) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    const providerId = utilisateur.accounts.map((acc) => acc.providerId);

    return NextResponse.json({
      message: `Données utilisateur récupérées avec succès`,
      email : utilisateur.email,
      pseudo : utilisateur.name,
      plan: utilisateur.plan,
      abonnement: utilisateur.abonnement,
      providerId,
    });

  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
