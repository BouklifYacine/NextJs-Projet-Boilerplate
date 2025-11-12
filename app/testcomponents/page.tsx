import AlertDialogButton from "@/components/AlertDialog/AlertDialogButton";
import { BadgeAnnoucement } from "@/components/Badge/BadgeTexteIcone";
import SimpleBadgeTextIcon from "@/components/Badge/SimpleBadgeTextIcon";
import { BadgeX } from "lucide-react";
import React from "react";

function Testcomponents() {
  return (
    <div className="flex items-center gap-6">
      <AlertDialogButton
        icon={<BadgeX />}
        textbutton={"Supprimer"}
        titre={"Titre"}
        description={"description"}
        textconfirmbutton={"Confirmez"}
        textcancelbutton={"Annuler"}
      ></AlertDialogButton>

      <BadgeAnnoucement texte={"Entraineur"}></BadgeAnnoucement>

      <SimpleBadgeTextIcon texte={"Simple Badge"}></SimpleBadgeTextIcon>
    </div>
  );
}

export default Testcomponents;
