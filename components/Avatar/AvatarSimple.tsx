import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  alt: string;
  src: string;
  Fallback: string;
  className?: string;
}

const AvatarSimple = ({ Fallback, alt, src, className }: Props) => {
  return (
    <>
      <div>
        <Avatar
          className={`border border-purple-600 cursor-pointer hover:scale-125 transition-transform ${className || ""}`}
        >
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback>{Fallback}</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
};

export { AvatarSimple };
