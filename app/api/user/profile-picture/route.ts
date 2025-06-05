import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { S3 } from "@/lib/s3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Fonction utilitaire pour extraire la clé S3 d'une URL
const getS3Key = (url: string) => {
  try {
    return new URL(url).pathname.split('/').pop() || null;
  } catch {
    return null;
  }
};

// Route POST pour ajouter/mettre à jour une photo de profil
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Connectez-vous" }, { status: 401 });
    }

    // Récupérer les données de la requête
    const body = await request.json();
    const { imageUrl, key } = body;

    // Validation basique
    if (!imageUrl || !key) {
      return NextResponse.json(
        { error: "URL de l'image et clé requises" },
        { status: 400 }
      );
    }

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { image: true }
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    // Si l'utilisateur a déjà une image, supprimer l'ancienne de S3
    if (user.image) {
      const oldKey = getS3Key(user.image);
      if (oldKey) {
        try {
          const deleteCommand = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: oldKey
          });
          await S3.send(deleteCommand);
        } catch (error) {
          console.error("Erreur lors de la suppression de l'ancienne image:", error);
          // On continue même si la suppression échoue
        }
      }
    }

    // Mettre à jour l'utilisateur avec la nouvelle image
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: imageUrl }
    });

    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la photo de profil:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}

// Route DELETE pour supprimer une photo de profil
export async function DELETE() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Connectez-vous" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { image: true }
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    if (!user.image) {
      return NextResponse.json({ error: "Aucune image à supprimer" }, { status: 400 });
    }

    // Extraire la clé S3 de l'URL de l'image
    const key = getS3Key(user.image);
    if (key) {
      try {
        // Supprimer l'image de S3
        const deleteCommand = new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: key
        });
        await S3.send(deleteCommand);
      } catch (error) {
        console.error("Erreur lors de la suppression de l'image S3:", error);
        // On continue même si la suppression échoue
      }
    }

    // Mettre à jour l'utilisateur pour supprimer la référence à l'image
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: null }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression de la photo de profil:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}