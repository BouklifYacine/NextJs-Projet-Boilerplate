import { GlobeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  icon?: React.ReactElement;
  iconbutton?: React.ReactElement;
  textbutton: string;
  text: string;
  text2?: string;
};

export default function TooltipWithIcon({
  icon,
  iconbutton,
  textbutton,
  text,
  text2,
}: Props) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            {iconbutton}
            {textbutton}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="dark py-3">
          <div className="flex gap-3">
            {icon}
            <div className="space-y-1">
              <p className="text-[13px] font-medium">{text}</p>
              <p className="text-xs text-muted-foreground">{text2}</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
