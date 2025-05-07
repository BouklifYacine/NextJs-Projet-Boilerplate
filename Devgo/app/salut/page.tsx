"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { DarkMode } from "@/components/BoutonDarkMode/DarkMode";

const Salut = () => {
  const { data: session } = authClient.useSession();

  console.log(session?.user);

  return (
    <div className="flex gap-8">
      <p>{session?.user.name}</p>
      <p>tg</p>
      <DarkMode></DarkMode>
    </div>
  );
};

export default Salut;
