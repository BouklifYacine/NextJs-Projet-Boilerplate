import BoutonConnexionProviders from "@/components/Buttons/BoutonConnexionProviders";
import { Footer } from "@/components/Footer/footer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="min-h-dvh w-screen flex items-center justify-center flex-col gap-y-4 p-4">
      <p>Page d'accueil de gros bg </p>
      <Footer />
      <BoutonConnexionProviders />
    </main>
  );
}
