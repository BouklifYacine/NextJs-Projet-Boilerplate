import { useId } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {
  id: string;
  text: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
};

export default function GroupedCheckbox({
  id,
  text,
  checked,
  onCheckedChange,
  disabled,
}: Props) {
  return (
    <div className="flex gap-6">
      <div className="flex items-center gap-2">
        <Checkbox
          id={`${id}-a`}
          defaultChecked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
        />
        <Label htmlFor={`${id}-a`}>{text}</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id={`${id}-b`}
          defaultChecked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
        />
        <Label htmlFor={`${id}-b`}>{text}</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id={`${id}-c`}
          defaultChecked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
        />
        <Label htmlFor={`${id}-c`}>{text}</Label>
      </div>
    </div>
  );
}
