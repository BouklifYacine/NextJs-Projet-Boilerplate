import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

interface Props {
    texte : string
}

function BoutonDisabled({texte} : Props) {
  return (
    <Button disabled>
      <LoaderCircle
        className="-ms-1 me-2 animate-spin"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
      {texte}
    </Button>
  );
}

export { BoutonDisabled };
