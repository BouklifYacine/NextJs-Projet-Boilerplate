import { createServerFn } from "@tanstack/react-start";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3 } from "@/lib/s3Client";
import { z } from "zod";

export const deleteFileAction = createServerFn({ method: "POST" })
  .inputValidator(z.object({ key: z.string() }))
  .handler(async ({ data: { key } }) => {
    try {
      if (!key) {
        throw new Error("La clé est requise");
      }

      const command = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: key,
      });

      await S3.send(command);

      return { message: "Supprimé réussie" };
    } catch (error) {
      console.log(error);
      throw new Error("Erreur serveur");
    }
  });
