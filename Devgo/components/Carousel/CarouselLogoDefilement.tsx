import { Logos3 } from "../ui/Logo3";

import Logo from "@/public/vercel.svg"


const demoData = {

  logos: [
    {
      id: "logo-1",
      description: "Astro",
      image: Logo,
      className: "h-7 w-auto",
    },
    {
      id: "logo-2",
      description: "Figma",
      image: Logo,
      className: "h-7 w-auto",
    },
    {
      id: "logo-3",
      description: "Next.js",
      image: Logo,
      className: "h-7 w-auto",
    },
    {
      id: "logo-4",
      description: "React",
      image: Logo,
      className: "h-7 w-auto",
    },
    {
      id: "logo-5",
      description: "shadcn/ui",
      image: Logo,
      className: "h-7 w-auto",
    },
    {
      id: "logo-6",
      description: "Supabase",
      image: Logo,
      className: "h-7 w-auto",
    },
    {
      id: "logo-7",
      description: "Tailwind CSS",
      image: Logo,
      className: "h-7 w-auto",
    },
    {
      id: "logo-8",
      description: "Vercel",
      image: Logo,
      className: "h-7 w-auto",
    },
  ],
};

function CarouselLogoDefilement() {
  return <Logos3 {...demoData} />
  ;
}

export { CarouselLogoDefilement };
