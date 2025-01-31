import Image from 'next/image'
import React from 'react'
import Github from "@/app/public/Github.png"
import Google from "@/app/public/Google.png"

const DesignBoutonGoogle = () => {
  return (
   <>
   <Image src={Github} alt='Github' className='rounded-3xl h-6 w-auto'></Image>
   <Image src={Google} alt='Google' className='rounded-3xl h-6 w-auto'></Image>
   </>
  )
}

export default DesignBoutonGoogle