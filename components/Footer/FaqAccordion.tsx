import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
  id: string;
  title: string;
  content: string;
}

interface FaqAccordionProps {
  title?: string;
  items: FaqItem[];
  defaultOpenId?: string;
  className?: string;
}

export default function FaqAccordion({
  title,
  items,
  defaultOpenId,
  className = "",
}: FaqAccordionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h2 className="text-xl font-bold">{title}</h2>}
      <Accordion
        type="single"
        collapsible
        className="w-full -space-y-px"
        defaultValue={defaultOpenId}
      >
        {items.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="relative border bg-background px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
          >
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="pb-2 text-muted-foreground">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
