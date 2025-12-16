import ky from "ky";
import type {
  PasswordResetResponse,
  PasswordResetConfirmData,
} from "../types/passwordreset.types";

export const PasswordResetService = {
  /**
   * Request a password reset code to be sent to email
   */
  async requestPasswordReset(email: string): Promise<PasswordResetResponse> {
    return ky
      .post("/api/motdepasseoublie", { json: { email } })
      .json<PasswordResetResponse>();
  },

  /**
   * Confirm password reset with code and new password
   */
  async confirmPasswordReset(
    data: PasswordResetConfirmData
  ): Promise<PasswordResetResponse> {
    return ky
      .post("/api/motdepasseoublie/confirmation", { json: data })
      .json<PasswordResetResponse>();
  },
};
