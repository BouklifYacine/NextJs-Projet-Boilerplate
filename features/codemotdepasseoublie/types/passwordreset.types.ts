export interface PasswordResetResponse {
  message: string;
}

export interface PasswordResetConfirmData {
  email: string;
  code: string;
  newPassword: string;
}
