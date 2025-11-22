import { HandWrittenTitle } from "@/components/ui/hand-writing-text";

type Props = {
  title: string;
  subtitle: string;
};

function CircledTextAnimation({ title, subtitle }: Props) {
  return <HandWrittenTitle title={title} subtitle={subtitle} />;
}

export { CircledTextAnimation };
