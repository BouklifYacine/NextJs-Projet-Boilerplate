import ky from "ky";
import type {
  PresignedUrlResponse,
  UploadPayload,
} from "../types/upload.types";

export const UploadService = {
  /**
   * Get a presigned URL for uploading a file to S3
   */
  async getPresignedUrl(payload: UploadPayload): Promise<PresignedUrlResponse> {
    return ky
      .post("/api/s3/upload", { json: payload })
      .json<PresignedUrlResponse>();
  },

  /**
   * Delete a file from S3
   */
  async deleteFile(key: string): Promise<Response> {
    return ky.delete("/api/s3/delete", { json: { key } });
  },
};
