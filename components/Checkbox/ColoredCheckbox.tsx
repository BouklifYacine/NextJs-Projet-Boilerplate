import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {
  id: string;
  text: string;
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
};

export default function ColoredCheckbox({
  id,
  text,
  className,
  checked,
  onCheckedChange,
  disabled,
}: Props) {
  return (
    <div
      className={`flex items-center gap-2 [--primary:var(--color-indigo-500)] [--ring:var(--color-indigo-300)] in-[.dark]:[--primary:var(--color-indigo-500)] in-[.dark]:[--ring:var(--color-indigo-900)] ${className || ""}`}
    >
      <Checkbox
        id={id}
        defaultChecked={checked}
        onCheckedChange={onCheckedChange}
        className={`${disabled ? "opacity-50 cursor-not-allowed " : ""}border-(--primary) focus-visible:ring-(--ring) data-[state=checked]:bg-(--primary) data-[state=checked]:border-(--primary)`}
        disabled={disabled}
      />
      <Label htmlFor={id}>{text}</Label>
    </div>
  );
}
