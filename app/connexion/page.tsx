import { MiddlewareUtilisateurConnecte } from "../(middleware)/UtilisateurConnecte";
import { ConnexionFormulaire } from "../../features/connexion/components/ConnexionFormulaire";
import { GalleryVerticalEnd } from "lucide-react";

export default async function ConnexionPage() {
  await MiddlewareUtilisateurConnecte();

  return (
    <main className="min-h-svh bg-muted flex flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-8">
        <header className="flex flex-col items-center gap-4 text-center">
          <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-xl shadow-sm">
            <GalleryVerticalEnd className="size-6" />{" "}
            {/* TODO: Remplacer par un logo */}
          </div>
          <h1 className="text-huge font-bold tracking-tight">Boilerplate</h1>{" "}
          {/* TODO: Remplacer par un titre */}
        </header>

        <section className="bg-background rounded-2xl shadow-xs">
          <ConnexionFormulaire />
        </section>
      </div>
    </main>
  );
}
