"use client";

import { BellIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  number: number;
  onClick: () => void;
  className?: string;
};

export default function CountNotification({
  number,
  onClick,
  className,
}: Props) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={`relative ${className || ""}`}
      onClick={onClick}
      aria-label="Notifications"
    >
      <BellIcon
        className={` ${className || ""}`}
        size={16}
        aria-hidden="true"
      />
      {number > 0 && (
        <Badge
          className={`absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1 ${className || ""}`}
        >
          {number > 99 ? "99+" : number}
        </Badge>
      )}
    </Button>
  );
}
