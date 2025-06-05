import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { S3 } from "@/lib/s3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// API route pour mettre à jour l'image de profil de l'utilisateur
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await auth.api.getSession({
      headers: await headers()
    });
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté" },
        { status: 401 }
      );
    }

    // Récupérer les données du corps de la requête
    const body = await request.json();
    const { imageUrl, key } = body;

    if (!imageUrl || !key) {
      return NextResponse.json(
        { error: "L'URL de l'image et la clé sont requises" },
        { status: 400 }
      );
    }

    // Récupérer l'utilisateur actuel
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { image: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Si l'utilisateur a déjà une image, on extrait la clé pour la supprimer plus tard
    let oldImageKey = null;
    if (user.image) {
      try {
        // Extraire la clé de l'ancienne image à partir de l'URL
        const url = new URL(user.image);
        const pathname = url.pathname;
        // Le format est généralement /bucket-name/key
        oldImageKey = pathname.split('/').pop();
      } catch (error) {
        console.error("Erreur lors de l'extraction de la clé de l'ancienne image:", error);
      }
    }

    // Mettre à jour l'image de profil de l'utilisateur
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: imageUrl }
    });

    // Si l'utilisateur avait déjà une image, on la supprime de S3
    if (oldImageKey) {
      try {
        const deleteCommand = new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: oldImageKey
        });
        await S3.send(deleteCommand);
      } catch (error) {
        console.error("Erreur lors de la suppression de l'ancienne image:", error);
        // On continue même si la suppression échoue
      }
    }

    return NextResponse.json({
      success: true,
      message: "Image de profil mise à jour avec succès",
      imageUrl
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'image de profil:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}

// API route pour supprimer l'image de profil de l'utilisateur
export async function DELETE() {
  try {
    // Vérifier l'authentification
    const session = await auth.api.getSession({
      headers: await headers()
    });
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté" },
        { status: 401 }
      );
    }

    // Récupérer l'utilisateur actuel
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { image: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Si l'utilisateur n'a pas d'image, on renvoie une erreur
    if (!user.image) {
      return NextResponse.json(
        { error: "Aucune image de profil à supprimer" },
        { status: 400 }
      );
    }

    // Extraire la clé de l'image à partir de l'URL
    let imageKey = null;
    try {
      const url = new URL(user.image);
      const pathname = url.pathname;
      // Le format est généralement /bucket-name/key
      imageKey = pathname.split('/').pop();
    } catch (error) {
      console.error("Erreur lors de l'extraction de la clé de l'image:", error);
    }

    // Mettre à jour l'utilisateur pour supprimer l'image
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: null }
    });

    // Si on a pu extraire la clé, on supprime l'image de S3
    if (imageKey) {
      try {
        const deleteCommand = new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: imageKey
        });
        await S3.send(deleteCommand);
      } catch (error) {
        console.error("Erreur lors de la suppression de l'image:", error);
        // On continue même si la suppression échoue
      }
    }

    return NextResponse.json({
      success: true,
      message: "Image de profil supprimée avec succès"
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image de profil:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}