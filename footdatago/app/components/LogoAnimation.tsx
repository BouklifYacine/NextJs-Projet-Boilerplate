"use client";
import Image from "next/image";
import React from "react";
import LogoLiverpool from "@/app/public/Logo_FC_Liverpool.svg.png";
import LogoRealMadrid from "@/app/public/Logo_Real_Madrid.svg.png";
import LogoBarcelone from "@/app/public/Logo_FC_Barcelona.svg.webp";
import LogoManCity from "@/app/public/Logo_Manchester_City_2016.svg";
import LogoBayern from "@/app/public/FC_Bayern_München_logo_(2017).svg.png";
import LogoArsenal from "@/app/public/Arsenal_FC.svg.webp";

const LogoAnimation = () => {
  return (
    <div className="bg-white py-8 md:py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <div>
          <p className="text-center mb-6 md:mb-10 text-sm md:text-xl font-medium">Ces clubs nous font confiance</p>
        </div>
        <div className="flex justify-center w-full">
          <div className="flex items-center justify-between   w-full max-w-6xl ">
            <Image
              src={LogoLiverpool}
              alt="Liverpool"
               className="w-auto h-10 md:h-20 lg:h-24"
              priority
            />
            <Image
              src={LogoRealMadrid}
              alt="Real Madrid"
               className="w-auto h-10 md:h-20 lg:h-24"
              priority
            />
            <Image
              src={LogoManCity}
              alt="Manchester City"
                className="w-auto h-10 md:h-20 lg:h-24"
              priority
            />
            <Image
              src={LogoBayern}
              alt="Bayern"
              className="w-auto h-10 md:h-20 lg:h-24"
              priority
            />
            <Image
              src={LogoBarcelone}
              alt="Barcelone"
              className="w-auto h-10 md:h-20 lg:h-24"
              priority
            />
            <Image
              src={LogoArsenal}
              alt="Arsenal"
              className="w-auto h-10 md:h-20 lg:h-24"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoAnimation;