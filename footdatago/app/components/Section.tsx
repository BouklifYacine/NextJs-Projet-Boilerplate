import React from 'react'
import { ShimmerButton } from "@/components/ui/shimmer-button";

const Section = () => {
  return (
    <section>
    <div className='max-w-7xl mx-auto bg-red-500 mt-8 py-5 '>

        <div className='text-center flex-col justify-center gap-x-10'>
            <h1 className=' text-xl md:text-5xl font-bold '> Comparez les datas des plus grands joueurs mondiaux </h1>
            <p className='text-center'> Grace a notre outil comparez les datas détaillées des plus grands joueurs mondiaux mettez les en favoris et suivez leur performances et l'évolution au fil de la saison. </p>
           </div>

           <div className='flex justify-center items-center py-5'>
            <ShimmerButton className='py-2 px-8 text-xl font-medium tracking-tight'> Comparez  </ShimmerButton>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
  <div className="avatar">
    <div className="w-12">
      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="avatar">
    <div className="w-12">
      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="avatar">
    <div className="w-12">
      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="avatar placeholder">
    <div className="bg-neutral text-neutral-content w-12">
      <span>+99</span>
    </div>
  </div>
</div>
           </div>
        
         </div>
         </section>
  )
}

export default Section