import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { S3 } from "@/lib/s3Client";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { uploadRequestSchema } from "@/features/upload/schemas/SchemaUpload";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Utilitaire pour extraire la clé S3 depuis une URL
const getS3Key = (url: string) => {
  try {
    return new URL(url).pathname.split('/').pop() || null;
  } catch {
    return null;
  }
};

export async function POST(request: NextRequest) {
  try {
    // Authentification
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Connectez-vous" }, { status: 401 });
    }

    // Validation du body
    const body = await request.json();
    const validation = uploadRequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { contentType, size, fileName } = validation.data;
    const uniqueKey = `${uuidv4()}-${fileName}`;
   

    // Récupérer l'ancienne image pour suppression éventuelle
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { image: true }
    });

    // Générer la presigned URL
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: uniqueKey,
      ContentType: contentType,
      ContentLength: size,
    });
    const presignedurl = await getSignedUrl(S3, command, { expiresIn: 360 });

    // Mettre à jour la BDD avec la nouvelle image
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: presignedurl }
    });

    // Supprimer l'ancienne image si elle existe
    if (user?.image) {
      const oldKey = getS3Key(user.image);
      if (oldKey) {
        await S3.send(
          new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: oldKey,
          })
        );
      }
    }

    return NextResponse.json({
      presignedurl,
      key: uniqueKey,
      uniqueKey,
      message: "URL de l'image enregistrée dans la base de données",
    });
  } catch (error) {
    console.error("Erreur API upload:", error);
    return NextResponse.json(
      { message: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}

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

    const key = getS3Key(user.image);
    if (key) {
      await S3.send(
        new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: key,
        })
      );
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: null },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur suppression profil:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}