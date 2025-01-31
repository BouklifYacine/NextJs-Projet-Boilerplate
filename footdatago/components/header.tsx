'use client'

import Image from "next/image";
import React from "react";
import LogoLiverpool from "@/app/public/Logo_FC_Liverpool.svg.png";
import { MenuDeroulant } from "@/components/MenuDeroulant";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useSession } from 'next-auth/react'
import { Deconnexion } from "./BoutonDéconnexion";
import { BoutonConnexion } from "./BoutonConnexion";


const Header = () => {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 pt-4 px-4 bg-black ">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 md:py-4">
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

          <nav className="hidden md:flex items-center gap-8 text-lg tracking-tight">
            <Link href="/data" className="text-white hover:text-purple-600 opacity-80 transition-colors">
              Data
            </Link>
            <Link href="/favoris" className="text-white hover:text-purple-600 opacity-80 transition-colors">
              Classement
            </Link>
            <Link href="/classement" className="text-white hover:text-purple-600 opacity-80 transition-colors">
              Favoris
            </Link>
            
            {!session ? (
              <div className="flex items-center gap-6">
           
           <BoutonConnexion></BoutonConnexion>

                <Avatar className="border border-purple-600 cursor-pointer hover:scale-125 transition-transform">
                  <AvatarImage 
                    src="https://cdn.vox-cdn.com/thumbor/r0U59Lx7DOSI2Z_F7WLnzcbQfuU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24953495/1698708349.jpg" 
                    alt="Logo" 
                  />
                  <AvatarFallback>LFC</AvatarFallback>
                </Avatar>
             
              </div>
            ) : (
              <div className="flex items-center gap-6">
               
               <Deconnexion></Deconnexion>

                <Avatar className="border border-purple-600 cursor-pointer hover:scale-125 transition-transform">
                  <AvatarImage 
                    src={session.user?.image ?? ""} 
                    alt={session.user?.name ?? "User avatar"} 
                  />
                  <AvatarFallback>{session.user?.name?.[0]?.toUpperCase() ?? ""}</AvatarFallback>
                </Avatar>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;