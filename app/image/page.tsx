"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import React from "react";


function Imagepage() {
  const { data: session } = authClient.useSession();
  console.log(session)
  return (
    <div>
      {/* <ImageUpload></ImageUpload> */}
      <Image src={session?.user.image || ""} alt={session?.user.name || ""} width={30} height={30}></Image>
    </div>
  );
}

export default Imagepage;
