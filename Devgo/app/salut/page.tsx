"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { DarkMode } from "@/components/BoutonDarkMode/DarkMode";
import { RadioGroupBlock } from "@/components/RadioGroup/RadioGroupBlock";
import AvatarOffline from "@/components/Avatar/AvatarOffline";
import { AvatarEnLigne } from "@/components/Avatar/AvatarEnLigne";
import InputOTP from "@/components/Inputs/InputOTP";
import InputPassword from "@/components/Inputs/InputPassword";
import { InputTexteAnimation } from "@/components/Inputs/InputTexteAnimation";
import InputTexteLimite from "@/components/Inputs/InputTexteLimite";
import InputResetBouton from "@/components/Inputs/InputResetBouton";
import AlerteDIalogueIcone from "@/components/AlertDialog/AlerteDialogueIcone";

const Salut = () => {
  const { data: session } = authClient.useSession();

  console.log(session?.user);

  const src =
    "https://cdn.vox-cdn.com/thumbor/r0U59Lx7DOSI2Z_F7WLnzcbQfuU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24953495/1698708349.jpg";

  return <>
 <div className="flex gap-4 flex-wrap">
<AlerteDIalogueIcone TexteBouton="Supprimer" Titre="Voulez vous supprimez?"  description="T'es con"></AlerteDIalogueIcone>

 </div>
  </>;
};

export default Salut;
