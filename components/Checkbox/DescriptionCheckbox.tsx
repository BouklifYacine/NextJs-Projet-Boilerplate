import { useId } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {
  id: string;
  text: string;
  sublabel?: string;
  description?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
};

export default function DescriptionCheckbox({
  id,
  text,
  sublabel,
  description,
  checked,
  onCheckedChange,
  disabled,
}: Props) {
  return (
    <div className="flex items-start gap-2">
      <Checkbox
        id={id}
        aria-describedby={`${id}-description`}
        defaultChecked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
      <div className="grid grow gap-2">
        <Label htmlFor={id}>
          {text}{" "}
          <span className="text-xs leading-[inherit] font-normal text-muted-foreground">
            {sublabel}
          </span>
        </Label>
        <p id={`${id}-description`} className="text-xs text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
