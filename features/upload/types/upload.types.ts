export interface PresignedUrlResponse {
  presignedurl: string;
  key: string;
}

export interface UploadPayload {
  contentType: string;
  size: number;
  fileName: string;
}
