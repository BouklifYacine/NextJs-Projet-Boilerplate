import Image from "next/image";
import React from "react";
import LogoLiverpool from "@/app/public/Logo_FC_Liverpool.svg.png";
import { MenuDeroulant } from "./MenuDeroulant";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { ChevronRight } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-md bg-white/50">
  
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-3 md:py-5">
      
        <div className="flex items-center justify-between">
         
          <Link href="/">
            <Image
              src={LogoLiverpool}
              alt="Logo Liverpool FC"
              height={50}
              width={50}
              className="hover:scale-110 transition-transform"
              priority
            />
          </Link>
          
          <div className="md:hidden">
            <MenuDeroulant />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-lg tracking-tight ">
            <Link href="/data" className=" text-black hover:text-purple-600 opacity-60 transition-colors">
              Data
            </Link>
            <Link href="/favoris" className="text-black hover:text-purple-600 opacity-60 transition-colors">
              Favoris
            </Link>
            <Link href="/classement" className="text-black hover:text-purple-600 opacity-60 transition-colors">
              Classement
            </Link>
            
            <Button 
              asChild 
              variant="default" 
              className="ml-4 hover:bg-black/70"
            >
              <Link href="/connexion"> Connexion <ChevronRight />  </Link>
            </Button>

            <Avatar className="ml-4 border border-purple-600 cursor-pointer hover:scale-125 transition-transform">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>Profil</AvatarFallback>
            </Avatar>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;
