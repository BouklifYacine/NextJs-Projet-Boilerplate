"use client";

import { BoutonDisabled } from "@/components/Boutons/BoutonDisabled";
import { TooltipButton } from "@/components/Boutons/TooltipButton";
import { BoutonModifier } from "@/components/Boutons/BoutonModifier";
import { Pencil } from "lucide-react";
import React from "react";

function Testcomponents() {
  return (
    <div className="flex  justify-center gap-6 ">
      <BoutonDisabled text="Chargement"></BoutonDisabled>
      <TooltipButton text="Survoler moi" tooltipText="Ceci est une infobulle" />
      <BoutonModifier text="Modifier" icon={<Pencil className="w-4 h-4" />} />
    </div>
  );
}

export default Testcomponents;
