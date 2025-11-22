import { useId } from "react";
import { ListFilterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { text } from "stream/consumers";

type PopoverFilterProps = {
  Title: string;
  icon?: React.ReactNode;
  ClearButton?: React.ReactNode;
  ApplyButton?: React.ReactNode;
  OnClear?: () => void;
  OnApply?: () => void;
  itemfilter: ItemFilterProps[];
};

type ItemFilterProps = {
  text: string;
  Checkbox: React.ReactElement;
};

export default function PopoverFilter({
  Title,
  icon,
  itemfilter,
  OnClear,
  OnApply,
}: PopoverFilterProps) {
  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Filters">
            <ListFilterIcon size={16} aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-36 p-3">
          <div className="space-y-3">
            <div className="text-xs font-medium text-muted-foreground">
              {Title}
            </div>
            <form>
              <div className="space-y-3">
                {itemfilter.map((item) => (
                  <div className="flex items-center gap-2">
                    {item.Checkbox}
                    <Label className="font-normal">{item.text}</Label>
                  </div>
                ))}
              </div>
              <div
                role="separator"
                aria-orientation="horizontal"
                className="-mx-3 my-3 h-px bg-border"
              ></div>
              <div className="flex justify-between gap-2">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-7 px-2"
                  onClick={OnClear}
                >
                  Clear
                </Button>
                <Button size="sm" className="h-7 px-2" onClick={OnApply}>
                  Apply
                </Button>
              </div>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
