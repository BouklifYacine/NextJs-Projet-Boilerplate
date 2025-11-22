import { BoutonDisabled } from "@/components/Boutons/BoutonDisabled";
import { BoutonRetourPage } from "@/components/Boutons/BoutonRetourPage";
import { BoutonSupprimer } from "@/components/Boutons/BoutonSupprimer";
import { BoutonTooltip } from "@/components/Boutons/BoutonTooltip";
import { BoutonModifier } from "@/components/Boutons/BoutonModifier";
import { Pencil } from "lucide-react";

import React from "react";

function Testcomponents() {
  return (
    <div className="flex  justify-center gap-6 ">
      <BoutonSupprimer></BoutonSupprimer>
      <BoutonDisabled texte={"Chargement"}></BoutonDisabled>
      <BoutonRetourPage texte={"Suivant"}></BoutonRetourPage>
      <BoutonTooltip text="Survoler moi" tooltipText="Ceci est une infobulle" />
      <BoutonModifier text="Modifier" icon={<Pencil className="w-4 h-4" />} />
    </div>
  );
}

export default Testcomponents;
