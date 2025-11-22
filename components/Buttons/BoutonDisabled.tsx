"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

interface Props {
  text: string;
  className?: string;
  classnameLoader?: string;
}

function BoutonDisabled({ text, className, classnameLoader }: Props) {
  return (
    <Button disabled className={` ${className || ""}`}>
      <LoaderCircle
        className={`${classnameLoader} animate-spin disabled:cursor-not-allowed`}
        aria-hidden="true"
      />
      {text}
    </Button>
  );
}

export { BoutonDisabled };
