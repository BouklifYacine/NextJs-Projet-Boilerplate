import { prisma } from "@/prisma";
import { S3 } from "@/lib/s3Client";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { uploadRequestSchema } from "@/features/upload/schemas/SchemaUpload";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@/auth";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

// Utilitaire pour extraire la clé S3 depuis une URL
const getS3Key = (url: string) => {
  try {
    return new URL(url).pathname.split("/").pop() || null;
  } catch {
    return null;
  }
};

// === SERVER ACTION pour l'upload (POST) ===
export const serverUploadProfilePicture = createServerFn({ method: "POST" })
  .inputValidator(uploadRequestSchema)
  .handler(async ({ data }) => {
    try {
      // Authentification
      const request = getRequest();
      const session = await auth.api.getSession({ headers: request.headers });
      if (!session?.user?.id) {
        throw new Error("Connectez-vous");
      }

      const { contentType, size, fileName } = data;
      const uniqueKey = `${uuidv4()}-${fileName}`;

      // Récupérer l'ancienne image pour suppression éventuelle
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { image: true },
      });

      // Générer la presigned URL
      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: uniqueKey,
        ContentType: contentType,
        ContentLength: size,
      });
      const presignedurl = await getSignedUrl(S3, command, { expiresIn: 360 });

      // Mettre à jour la BDD avec la nouvelle image (on garde la presignedurl comme dans ton code)
      await prisma.user.update({
        where: { id: session.user.id },
        data: { image: presignedurl },
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

      return {
        presignedurl,
        key: uniqueKey,
        uniqueKey,
        message: "URL de l'image enregistrée dans la base de données",
      };
    } catch (error) {
      console.error("Erreur API upload:", error);
      throw new Error("Erreur serveur interne");
    }
  });

// === SERVER ACTION pour la suppression (DELETE) ===
export const serverDeleteProfilePicture = createServerFn({
  method: "POST",
}).handler(async () => {
  try {
    const request = getRequest();
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      throw new Error("Connectez-vous");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { image: true },
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    if (!user.image) {
      throw new Error("Aucune image à supprimer");
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

    return { success: true };
  } catch (error) {
    console.error("Erreur suppression profil:", error);
    throw new Error("Erreur serveur");
  }
});
