import React from 'react'
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AvatarCircles } from "@/components/ui/avatar-circles";


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
      <div className=' mx-auto bg-red-500 mt-8 py-5'>
      
        <div className=' flex flex-col justify-center items-center gap-3 py-2'>
        <h1 className='text-4xl md:text-7xl font-bold px-4 tracking-tight text-center'>
  Comparez les datas <br /> des plus grands joueurs mondiaux.
</h1>
          <p className='max-w-2xl text-base md:text-xl text-center px-4'>
            Grace à notre outil comparez les datas détaillées des plus grands joueurs mondiaux 
            mettez les en favoris pour suivre leur performances et leurs évolution au fil de la saison.
          </p>
          <div className='flex justify-center items-center'>
          <ShimmerButton className='py-2 px-8 text-xl font-medium tracking-tight'>
            Utiliser FootDataGo
          </ShimmerButton>
        </div>

        <div className='flex flex-col items-center justify-center md:flex-row gap-2 min-h-[100px]'>
          <AvatarCircles numPeople={99} avatarUrls={avatars} />
          <span className=" text-base ">Utiliser par +100 utilisateurs</span>
        </div>
        </div>
      </div>
    </section>
  )
}

export default Section