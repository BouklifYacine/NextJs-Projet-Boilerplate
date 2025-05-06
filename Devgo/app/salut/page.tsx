"use client"

import React from "react";
import { authClient } from "@/lib/auth-client";

const Salut =   () => {
  const { data: session } = authClient.useSession()


console.log(session?.user)

  return (
    <div className="flex gap-8">
      <p>tg</p>
      <p>
        tg
      </p>
    </div>
  );
};

export default Salut;
