import Image from "next/image";
import React from "react";
import LogoLiverpool from "@/app/public/Logo_FC_Liverpool.svg.png";
import LogoRealMadrid from "@/app/public/Logo_Real_Madrid.svg.png"
import LogoBarcelone from "@/app/public/Logo_FC_Barcelona.svg.webp"
import LogoManCity from "@/app/public/Logo_Manchester_City_2016.svg"
import LogoBayern from "@/app/public/FC_Bayern_München_logo_(2017).svg.png"
import LogoArsenal from "@/app/public/Arsenal_FC.svg.webp"

const LogoAnimation = () => {
  return (
    <>
    <div className="">
      <p className="text-center px-8 py-8 text-xl font-medium text-black/50">
        Les clubs partenaires a FootDataGo
        qui nous font confiance.
      </p>
      <div className="flex items-center justify-evenly pb-9 ">
        <Image
          src={LogoLiverpool}
          alt="Liverpool"
          height={80}
          width={80}
        ></Image>
         <Image
          src={LogoRealMadrid}
          alt="Real Madrid"
          height={80}
          className="w-auto"
        ></Image>
         <Image
          src={LogoManCity}
          alt="ManchesterCity"
          height={80}
          width={80}
        ></Image>
         <Image
          src={LogoBayern}
          alt="Bayern"
          height={80}
          width={80}
        ></Image>
         <Image
          src={LogoBarcelone}
          alt="Barcelone"
          height={80}
          width={80}
        ></Image>
         <Image
          src={LogoArsenal}
          alt="Arsenal"
          height={80}
          width={80}
        ></Image>
      </div>
      </div>
    </>
  );
};

export default LogoAnimation;
