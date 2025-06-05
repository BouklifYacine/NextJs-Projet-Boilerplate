import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Route GET pour récupérer l'image de profil d'un utilisateur
export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Connectez-vous" }, { status: 401 });
    }

    // Récupérer l'ID de l'utilisateur depuis la requête
    const userId = session.user.id;

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { image: true, name: true }
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    // Retourner l'URL de l'image
    return NextResponse.json({
      success: true,
      imageUrl: user.image,
      name: user.name
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'image de profil:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}