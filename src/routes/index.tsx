import BoutonConnexionProviders from "@/components/Buttons/BoutonConnexionProviders";
import { Footer } from "@/components/Footer/footer";
import Header from "@/features/landingpage/components/header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Header />
      <main className="min-h-dvh w-full flex items-center justify-center flex-col gap-y-4 p-4"></main>
      <Footer />
    </>
  );
}
