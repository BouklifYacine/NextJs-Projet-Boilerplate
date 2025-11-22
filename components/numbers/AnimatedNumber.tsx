import { NumberTicker } from "../ui/number-ticker";

interface Props {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  decimalPlaces?: number;
  delay?: number;
  className?: string;
}

export function AnimatedNumber({
  value,
  startValue,
  decimalPlaces,
  direction,
  delay,
  className,
}: Props) {
  return (
    <NumberTicker
      value={value}
      startValue={startValue}
      decimalPlaces={decimalPlaces}
      direction={direction}
      delay={delay}
      className={`whitespace-pre-wrap ${className} font-medium tracking-tighter text-black dark:text-white`}
    />
  );
}
