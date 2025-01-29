import React from 'react'
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AvatarCircles } from "@/components/ui/avatar-circles";

import { Star } from 'lucide-react';
import { IoStarSharp } from "react-icons/io5";


const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
];

const Section = () => {
  return (
    <section>
      <div className='mx-auto bg-black pt-20 h-full'>
        <div className='flex flex-col justify-center items-center gap-6 py-2'>
       
          <div className='flex justify-center items-center pb-2'>
            <ShimmerButton className='py-2 px-6 text-sm md:text-base font-medium tracking-tight'>
              FootDataGo version 0.6
            </ShimmerButton>
          </div>
          
    
          <h1 className='text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-bold tracking-tighter text-white text-center px-4 max-w-8xl'>
            Comparez les{' '}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text inline-block">
              datas
            </span>{' '}
            des <br className="hidden md:block" />
            joueurs de{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text inline-block">
              football
            </span>
          </h1>

          {/* Description */}
          <p className='max-w-2xl text-base md:text-lg lg:text-xl text-center px-4 text-white/70 pt-4'>
            Grace à notre outil utilisez et comparez les datas
           
            des joueurs et suivez leur performances au fil de la saison.
          </p>

          {/* Bouton Principal */}
          <div className='flex justify-center items-center pb-2 pt-4'>
            <ShimmerButton className='py-4 px-8 md:py-5 md:px-12 text-lg md:text-xl font-medium tracking-tight'>
              Utiliser FootDataGo
            </ShimmerButton>
          </div>

          {/* Utilisateurs */}
          <div className='flex flex-col items-center justify-center md:flex-row gap-3'>
            <AvatarCircles numPeople={100} avatarUrls={avatars} />
            <span className="text-base md:text-lg text-white">Approuvé par +100 utilisateurs</span>
          </div>
          
          {/* Étoiles */}
          <div className='flex pb-8 space-x-1'>
            <IoStarSharp className='text-yellow-500 text-2xl'/>
            <IoStarSharp className='text-yellow-500 text-2xl'/>
            <IoStarSharp className='text-yellow-500 text-2xl'/>
            <IoStarSharp className='text-yellow-500 text-2xl'/>
            <IoStarSharp className='text-yellow-500 text-2xl'/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section