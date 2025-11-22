"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className={cn("gap-2", className)}
    >
      {text}
      {icon && <span className="h-4 w-4">{icon}</span>}
    </Button>
  );
}
