import { createServerFn } from "@tanstack/react-start";
import { uploadRequestSchema } from "@/features/upload/schemas/SchemaUpload";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/s3Client";

export const getPresignedUrlAction = createServerFn({ method: "POST" })
  .inputValidator(uploadRequestSchema)
  .handler(async ({ data: { contentType, size, fileName } }) => {
    try {
      const uniqueKey = `${uuidv4()}-${fileName}`;

      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: uniqueKey,
        ContentType: contentType,
        ContentLength: size,
      });

      const presignedurl = await getSignedUrl(S3, command, {
        expiresIn: 360, // 6 minutes
      });

      return {
        presignedurl,
        key: uniqueKey,
      };
    } catch (error) {
      console.error("Erreur API upload:", error);
      throw new Error("Erreur serveur interne");
    }
  });
