import { useId } from "react";
import { Input } from "@/components/ui/input";

interface InputFloatingLabelProps {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function InputFloatingLabel({
  label,
  type = "text",
  disabled = false,
  value,
  onChange,
  className = "",
}: InputFloatingLabelProps) {
  const id = useId();

  return (
    <div className={`group relative ${className}`}>
      <label
        htmlFor={id}
        className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
      >
        <span className="inline-flex bg-background px-2">{label}</span>
      </label>
      <Input
        id={id}
        type={type}
        placeholder=" "
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
