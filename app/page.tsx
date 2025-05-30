import { CarouselLogoDefilement } from "@/components/Carousel/CarouselLogoDefilement";
import Faq from "@/components/Faq";
import Header from "@/components/header";
import { Pricing2 } from "@/components/pricing2";
import Section from "@/components/Section";

export default function Home() {
  return (
    <>
      <Header />
      <Section />
      <CarouselLogoDefilement></CarouselLogoDefilement>
      
      <Pricing2></Pricing2>
      <Faq></Faq>
    </>
  );
}
