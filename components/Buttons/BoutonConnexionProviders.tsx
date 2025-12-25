import { Image } from "@unpic/react";
import Github from "@/public/github-icon-2.svg";
import Google from "@/public/Google.png";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

const BoutonConnexionProviders = () => {
  const GoogleConnexion = async () => {
    try {
      console.log("Google OAuth clicked");
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      console.log("Google OAuth response:", data);
      return data;
    } catch (error) {
      console.error("Google OAuth error:", error);
    }
  };

  const GithubConnexion = async () => {
    try {
      console.log("GitHub OAuth clicked");
      const data = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
      console.log("GitHub OAuth response:", data);
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
        <Image src={Github} alt="GitHub Logo" width={25} height={25} />
        Connexion avec Github
      </Button>

      <Button
        variant="outline"
        type="button"
        onClick={GoogleConnexion}
        className="cursor-pointer"
      >
        <Image src={Google} alt="Google Logo" width={25} height={25} />
        Connexion avec Google
      </Button>
    </>
  );
};

export default BoutonConnexionProviders;
