import BoutonConnexionProviders from "@/components/Buttons/BoutonConnexionProviders";
import { CarouselComposant } from "@/components/Carousel/CarouselComposant";
import { Footer } from "@/components/Footer/footer";
import Faq from "@/features/landingpage/components/Faq";
import Header from "@/features/landingpage/components/header";
import { Pricing2 } from "@/features/landingpage/components/pricing2";
import Section from "@/features/landingpage/components/Section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Header />
      <Section />
      <CarouselComposant />
      <Pricing2></Pricing2>
      <Faq></Faq>
      <Footer></Footer>
    </>
  );
}
