"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DropdownMenuCheckboxGroupProps = {
  text: string;
  icon?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
};

type Props = {
  text: string;
  icon?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  items: DropdownMenuCheckboxGroupProps[];
};

export default function DropdownMenuCheckboxGroup({
  text,
  icon,
  items,
  disabled,
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
        {items.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.text}
            checked={item.checked}
            disabled={item.disabled}
            onCheckedChange={(checked) => {
              console.log(checked);
            }}
          >
            {item.text}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
