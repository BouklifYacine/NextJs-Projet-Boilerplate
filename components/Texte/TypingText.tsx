import { TypingAnimation } from "../ui/TypingAnimationv2";

interface TexteTaperV2Props {
  text: string;
}

export function TexteTaperV2({ text }: TexteTaperV2Props) {
  return (
    <TypingAnimation
      className="text-4xl font-bold text-black dark:text-white"
      text={text}
    />
  );
}
