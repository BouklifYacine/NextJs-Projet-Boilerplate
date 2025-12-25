import type {
  PasswordResetResponse,
  PasswordResetConfirmData,
} from "../types/passwordreset.types";
import { forgotPasswordAction } from "../actions/forgotPasswordAction";
import { confirmPasswordResetAction } from "../actions/confirmPasswordResetAction";

export const PasswordResetService = {
  /**
   * Request a password reset code to be sent to email
   */
  async requestPasswordReset(email: string): Promise<PasswordResetResponse> {
    const response = await forgotPasswordAction({ data: { email } });
    return response as PasswordResetResponse;
  },

  /**
   * Confirm password reset with code and new password
   */
  async confirmPasswordReset(
    data: PasswordResetConfirmData
  ): Promise<PasswordResetResponse> {
    const response = await confirmPasswordResetAction({ data });
    return response as PasswordResetResponse;
  },
};
