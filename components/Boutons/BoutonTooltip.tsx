"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface BoutonTooltipProps extends ButtonProps {
  text: string;
  tooltipText: string;
  onClick?: () => void;
  className?: string;
}

export function BoutonTooltip({
  text,
  tooltipText,
  onClick,
  className,
  variant = "default",
  ...props
}: BoutonTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            onClick={onClick}
            className={cn("", className)}
            {...props}
          >
            {text}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
