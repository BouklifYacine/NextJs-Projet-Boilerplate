"use client";
import Image from "next/image";
import Github from "@/app/public/Github.png";
import Google from "@/app/public/Google.png";
import React from "react";
import { authClient } from "@/lib/auth-client";

const BoutonConnexionProviders = () => {
  const GoogleConnexion = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    return data;
  };

  const GithubConnexion = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/salut"
    });

    return data;
  };

  return (
    <>
      <div className="flex justify-center items-center gap-8">
        <button type="button" onClick={GithubConnexion} className="cursor-pointer">
          <Image src={Github} alt="GitHub Logo" width={40} height={40} />
        </button>

        <button type="button" onClick={GoogleConnexion} className="cursor-pointer">
          <Image src={Google} alt="Google Logo" width={40} height={40} />
        </button>
      </div>
    </>
  );
};

export default BoutonConnexionProviders;
