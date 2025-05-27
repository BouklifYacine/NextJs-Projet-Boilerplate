import { MiddlewareUtilisateurConnecte } from "../(middleware)/UtilisateurConnecte";
import ClientInscriptionFormulaire from "./ClientInscriptionFormulaire";

export default async function InscriptionPage() {

  await MiddlewareUtilisateurConnecte();

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-black">
          Inscription
        </h2>
        <ClientInscriptionFormulaire />
      </div>
    </div>
  );
}
