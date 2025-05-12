"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import AlerteDIalogueIcone from "@/components/AlertDialog/AlerteDialogueIcone";
import { HandWrittenTitleDemo } from "@/components/Texte/TexteEntoureAnimation";
import { BoutonDarkMode2 } from "@/components/BoutonDarkMode/BoutonDarkMode2";

const Salut = () => {
  const { data: session } = authClient.useSession();

  console.log(session?.user);

  return <>
 <div className="flex gap-4 flex-wrap">
<AlerteDIalogueIcone TexteBouton="Supprimer" Titre="Voulez vous supprimez?"  description="T'es con"></AlerteDIalogueIcone>
<HandWrittenTitleDemo></HandWrittenTitleDemo>
<BoutonDarkMode2></BoutonDarkMode2>


 </div>
  </>;
};

export default Salut;
