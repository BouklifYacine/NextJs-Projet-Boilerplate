import { CarouselLogoDefilement } from "@/components/Carousel/CarouselLogoDefilement";
import { CarouselTitreLogo } from "@/components/Carousel/CarouselTitreLogo";
import Faq from "@/components/Faq";
import Header from "@/components/header";
import LogoAnimation from "@/components/LogoAnimation";
import Section from "@/components/Section";
import SectionPayement from "@/components/sectionspayement/SectionPayement";

export default function Home() {
  return (
    <>
      <Header />
      <Section />
      <CarouselLogoDefilement ></CarouselLogoDefilement>
      <SectionPayement></SectionPayement>
      <Faq></Faq>
    </>
  );
}
