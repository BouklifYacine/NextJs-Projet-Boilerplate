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
      <div className=' mx-auto bg-black mt-8 py-5 h-full'>
      
        <div className=' flex flex-col justify-center items-center gap-6 py-2'>
        <ShimmerButton className='py-2 px-8 text-lg font-medium tracking-tight'>
           FootDataGo version 0.6
          </ShimmerButton>
        <h1 className='text-4xl md:text-8xl font-bold tracking-tighter text-white  text-center'>
  Comparez les datas  des <br />  joueurs de <a className='text-purple-500'> football </a>
</h1> 
          <p className='max-w-2xl text-sm md:text-xl text-center px-4 text-white/70'>
            Grace à notre outil comparez les datas détaillées des joueurs <br/> 
            et suivez leur performances au fil de la saison.
          </p>
          <div className='flex justify-center items-center'>
          <ShimmerButton className='py-2 px-8 text-xl font-medium tracking-tight'>
            Utiliser FootDataGo
          </ShimmerButton>
        </div>

        <div className='flex flex-col items-end justify-center md:flex-row gap-2  '>
          <AvatarCircles numPeople={100} avatarUrls={avatars} />
          <span className=" text-base text-white">Utiliser par +100 utilisateurs</span>

        </div>
        <div className='flex  '>
        <IoStarSharp  className='text-yellow-500 text-2xl'/>
          <IoStarSharp  className='text-yellow-500 text-2xl'/>
          <IoStarSharp  className='text-yellow-500 text-2xl '/>
          <IoStarSharp  className='text-yellow-500 text-2xl'/>
          <IoStarSharp  className='text-yellow-500 text-2xl'/>
        </div>
        </div>
      </div>
    </section>
  )
}

export default Section