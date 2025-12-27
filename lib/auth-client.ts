import { createAuthClient } from "better-auth/react";
import {
  emailOTPClient,
  multiSessionClient,
  adminClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [emailOTPClient(), multiSessionClient(), adminClient()],
});

export const { signIn, signOut, useSession } = authClient;
