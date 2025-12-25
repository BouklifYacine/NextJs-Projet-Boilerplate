import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type BoutonTooltipProps = {
  text: string;
  tooltipText: string;
  onClick?: () => void;
  className?: string;
};

export function TooltipButton({
  text,
  tooltipText,
  onClick,
  className,
  ...props
}: BoutonTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            className={`cursor-pointer ${className || ""}`}
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
