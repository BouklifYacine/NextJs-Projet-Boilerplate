import React from "react";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { IoStarSharp } from "react-icons/io5";
import { HandWrittenTitle } from "../../../components/ui/hand-writing-text";
import { GlowEffectButton } from "../../../components/Buttons/BoutonGlowCTA";
import { Link } from "@tanstack/react-router";

const avatars = [
  {
    imageUrl: "/Logo_Manchester_City_2016.svg",
    profileUrl: "https://github.com/dillionverma",
    id: 1,
  },
  {
    imageUrl: "/Logo_Manchester_City_2016.svg",
    profileUrl: "https://github.com/tomonarifeehan",
    id: 2,
  },
  {
    imageUrl: "/Logo_Manchester_City_2016.svg",
    profileUrl: "https://github.com/BankkRoll",
    id: 3,
  },
  {
    imageUrl: "/Logo_Manchester_City_2016.svg",
    profileUrl: "https://github.com/safethecode",
    id: 4,
  },
  {
    imageUrl: "/Logo_Manchester_City_2016.svg",
    profileUrl: "https://github.com/sanjay-mali",
    id: 5,
  },
  {
    imageUrl: "/Logo_Manchester_City_2016.svg",
    profileUrl: "https://github.com/tomonarifeehan",
    id: 6,
  },
];

const Section = () => {
  return (
    <section>
      <div className="mx-auto pt-20 h-full">
        <HandWrittenTitle title="DevGogogo" subtitle="" />
        <div className="flex flex-col justify-center items-center gap-6 py-2">
          <div className="flex justify-center items-center pb-2"></div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-bold tracking-tighter  text-center px-4 max-w-8xl">
            Créer votre{" "}
            <span className="bg-linear-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text inline-block">
              projet
            </span>{" "}
            à <br className="hidden md:block" />
            une vitesse{" "}
            <span className="bg-linear-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text inline-block">
              éclair
            </span>
          </h1>

          <p className="max-w-2xl text-base md:text-lg lg:text-xl text-center px-4  pt-3">
            Grace à notre boilerplate gagnez plus de 80% de temps de
            configuration redondante pour des projets full-stack en NextJS.
          </p>

          <div className="flex justify-center items-center pb-2 pt-3">
            <Link to="/connexion">
              <GlowEffectButton texte="Rejoindre"></GlowEffectButton>
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center md:flex-row gap-3">
            <AvatarCircles numPeople={100} avatarUrls={avatars} />
            <span className="text-base md:text-lg ">
              Approuvé par +100 utilisateurs
            </span>
          </div>

          <div className="flex pb-8 space-x-1">
            <IoStarSharp className="text-yellow-500 text-2xl" />
            <IoStarSharp className="text-yellow-500 text-2xl" />
            <IoStarSharp className="text-yellow-500 text-2xl" />
            <IoStarSharp className="text-yellow-500 text-2xl" />
            <IoStarSharp className="text-yellow-500 text-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
