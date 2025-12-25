import { getPresignedUrlAction } from "../actions/getPresignedUrlAction";
import { deleteFileAction } from "../actions/deleteFileAction";
import type {
  PresignedUrlResponse,
  UploadPayload,
} from "../types/upload.types";

export const UploadService = {
  /**
   * Get a presigned URL for uploading a file to S3
   */
  async getPresignedUrl(payload: UploadPayload): Promise<PresignedUrlResponse> {
    const response = await getPresignedUrlAction({ data: payload });
    return response as PresignedUrlResponse;
  },

  /**
   * Delete a file from S3
   */
  async deleteFile(key: string): Promise<Response> {
    const response = await deleteFileAction({ data: { key } });
    return new Response(JSON.stringify(response));
  },
};
