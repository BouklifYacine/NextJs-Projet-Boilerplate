import { authClient } from "./auth-client";

export const DeconnexionClient = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = "/connexion";
      },
    },
  });
};
