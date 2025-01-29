import Image from "next/image";
import React from "react";
import LogoLiverpool from "@/app/public/Logo_FC_Liverpool.svg.png";

const LogoAnimation = () => {
  return (
    <>
      <p className="text-center m-10 px-2 text-base opacity-50 font-medium">
        Les clubs partenaires a FootDataGo
        qui font confiance a notre outil.
      </p>
      <div className="flex gap-10 justify-center ">
        <Image
          src={LogoLiverpool}
          alt="Liverpoool"
          height={80}
          width={80}
        ></Image>
         <Image
          src={LogoLiverpool}
          alt="Liverpoool"
          height={80}
          width={80}
        ></Image>
         <Image
          src={LogoLiverpool}
          alt="Liverpoool"
          height={80}
          width={80}
        ></Image>
         <Image
          src={LogoLiverpool}
          alt="Liverpoool"
          height={80}
          width={80}
        ></Image>
         <Image
          src={LogoLiverpool}
          alt="Liverpoool"
          height={80}
          width={80}
        ></Image>
      </div>
    </>
  );
};

export default LogoAnimation;
