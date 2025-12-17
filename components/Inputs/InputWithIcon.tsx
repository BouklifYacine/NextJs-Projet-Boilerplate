import { useId } from "react";
import { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputWithIconProps {
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  icon: LucideIcon;
  iconPosition?: "start" | "end";
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function InputWithIcon({
  label,
  placeholder = "",
  type = "text",
  icon: Icon,
  iconPosition = "end",
  disabled = false,
  value,
  onChange,
  className = "",
}: InputWithIconProps) {
  const id = useId();

  const iconElement = (
    <div
      className={`pointer-events-none absolute inset-y-0 ${
        iconPosition === "start" ? "start-0 ps-3" : "end-0 pe-3"
      } flex items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50`}
    >
      <Icon size={16} aria-hidden="true" />
    </div>
  );

  return (
    <div className={`*:not-first:mt-2 ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          className={`peer ${iconPosition === "start" ? "ps-9" : "pe-9"}`}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          value={value}
          onChange={onChange}
        />
        {iconElement}
      </div>
    </div>
  );
}
