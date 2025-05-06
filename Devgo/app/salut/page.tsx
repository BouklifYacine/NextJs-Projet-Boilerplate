"use client";

import { authClient } from "@/lib/auth-client";
import React from "react";
import Boutondeconnexion from "./boutondeconnexion";

const Salut = () => {
  const { data: session } = authClient.useSession();

  console.log(session?.user.name);

  return (
    <div className="flex gap-8">
      <p>{session ? session.user.id : "Pas connecté"}</p>
      <p>
        {session ? <Boutondeconnexion></Boutondeconnexion> : "pas de bouton"}
      </p>
    </div>
  );
};

export default Salut;
