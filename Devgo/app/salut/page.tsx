"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { DarkMode } from "@/components/BoutonDarkMode/DarkMode";
import { TestimonialsListe } from "@/components/Testimonials/Testimonials";
import { Chat } from "@/components/Chat/Chat";
import { Pricing2Demo, PricingBasic } from "@/components/Pricing/Pricing1";
import { BoutonSupprimerAnimation } from "@/components/Boutons/BoutonSupprimerAnimation";
import { BoutonSupprimer } from "@/components/Boutons/BoutonSupprimer";
import { FormulaireInscription } from "@/components/Formulaires/FormulaireInscription";
;


const Salut = () => {
  const { data: session } = authClient.useSession();

  console.log(session?.user);

  const src =
    "https://cdn.vox-cdn.com/thumbor/r0U59Lx7DOSI2Z_F7WLnzcbQfuU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24953495/1698708349.jpg";

    

  return (
 
  

<FormulaireInscription></FormulaireInscription>
   
  );
};

export default Salut;
