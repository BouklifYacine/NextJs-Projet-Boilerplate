import { Image } from "@unpic/react";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

const BoutonConnexionProviders = () => {
  const GoogleConnexion = async () => {
    try {
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      return data;
    } catch (error) {
      console.error("Google OAuth error:", error);
    }
  };

  const GithubConnexion = async () => {
    try {
      const data = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
      return data;
    } catch (error) {
      console.error("GitHub OAuth error:", error);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={GithubConnexion}
        className="cursor-pointer"
      >
        <Image
          src="/github-icon-2.svg"
          alt="GitHub Logo"
          width={25}
          height={25}
        />
        Connexion avec Github
      </Button>

      <Button
        variant="outline"
        type="button"
        onClick={GoogleConnexion}
        className="cursor-pointer"
      >
        <Image src="/Google.png" alt="Google Logo" width={25} height={25} />
        Connexion avec Google
      </Button>
    </>
  );
};

export default BoutonConnexionProviders;
