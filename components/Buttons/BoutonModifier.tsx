import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface BoutonModifierProps {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function BoutonModifier({
  text,
  icon,
  onClick,
  className,
  disabled = false,
}: BoutonModifierProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer ${className || ""}`}
    >
      {text}
      {icon && <span className="h-4 w-4">{icon}</span>}
    </Button>
  );
}
