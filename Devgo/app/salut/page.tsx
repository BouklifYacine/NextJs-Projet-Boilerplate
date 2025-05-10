"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { DarkMode } from "@/components/BoutonDarkMode/DarkMode";
import { AvatarEnLigne } from "@/components/Avatar/AvatarEnLigne";
import { BoutonCopier } from "@/components/Boutons/BoutonCopier";
import { BoutonBordureAnimation } from "@/components/Boutons/BoutonBordureAnimation";
import { BoutonLogoPlus } from "@/components/Boutons/BoutonLogoPlus";

const Salut = () => {
  const { data: session } = authClient.useSession();

  console.log(session?.user);

  const src = "https://cdn.vox-cdn.com/thumbor/r0U59Lx7DOSI2Z_F7WLnzcbQfuU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24953495/1698708349.jpg"

  return (
    <div className="flex gap-8">
      <p>{session?.user.name}</p>
      <p>tg</p>
      <DarkMode></DarkMode>
      <AvatarEnLigne Fallback="avatar" texte="test"></AvatarEnLigne>
     
      <BoutonCopier></BoutonCopier>
      <BoutonBordureAnimation></BoutonBordureAnimation>
      <BoutonLogoPlus></BoutonLogoPlus>
    </div>
  );
};

export default Salut;
