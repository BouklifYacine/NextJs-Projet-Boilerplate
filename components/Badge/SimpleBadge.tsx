import React from "react";
import { Badge } from "../ui/badge";

interface Props {
  texte: number | string;
  icon?: React.ReactNode;
  classname?: string;
}

function SimpleBadge({ texte, icon, classname }: Props) {
  return (
    <>
      <Badge className={classname}>
        {texte} {icon}
      </Badge>
    </>
  );
}

export default SimpleBadge;
