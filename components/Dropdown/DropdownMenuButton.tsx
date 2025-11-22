import {
  BoltIcon,
  ChevronDownIcon,
  CopyPlusIcon,
  FilesIcon,
  Layers2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DropdownElement = {
  icon: React.ReactElement;
  text: string;
};

type Props = {
  text: string;
  icon?: React.ReactElement;
  dropdownElements: DropdownElement[];
};

export default function DropdownMenuButton({
  text,
  icon,
  dropdownElements,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {icon}
          {text}
          <ChevronDownIcon
            className="-me-1 opacity-60"
            size={16}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {dropdownElements.map((element, index) => (
          <DropdownMenuItem key={index}>
            {element.icon}
            {element.text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
