
import { NombreAnime } from "@/components/Texte/NombreAnime";

import React from "react";

function Testcomponents() {
  return (
    <div className="flex  justify-center gap-6 ">
<NombreAnime value={200} className={"text-6xl"}></NombreAnime>
    </div>
  );
}

export default Testcomponents;
