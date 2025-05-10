"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { DarkMode } from "@/components/BoutonDarkMode/DarkMode";;
import { BoutonSupprimer } from "@/components/Boutons/BoutonSupprimer";
import { TexteTaperV2 } from "@/components/Texte/TexteTaperV2";
import { BlocStats } from "@/components/Blocks/BlocStats";
import { BadgeStatsChiffrePositif } from "@/components/Badge/BadgeStatsChiffrePositif";
import { BadgeTexteIcone } from "@/components/Badge/BadgeTexteIcone";

const Salut = () => {
  const { data: session } = authClient.useSession();

  console.log(session?.user);

  const src =
    "https://cdn.vox-cdn.com/thumbor/r0U59Lx7DOSI2Z_F7WLnzcbQfuU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24953495/1698708349.jpg";

  return (
    <div >
      <div>
      <p>{session?.user.name}</p>
      <p>tg</p>
      <DarkMode></DarkMode>
      <BoutonSupprimer></BoutonSupprimer>
      <TexteTaperV2></TexteTaperV2>
      </div>

      <div>
        <BlocStats></BlocStats>
    
        <BadgeStatsChiffrePositif></BadgeStatsChiffrePositif>
        <BadgeTexteIcone></BadgeTexteIcone>
      </div>

    
    </div>
  );
};

export default Salut;
