import ClientConnexionFormulaire from "./ClientConnexionFormulaire";
import { MiddlewareUtilisateurConnecte } from "../(middleware)/UtilisateurConnecte";

export default async function ConnexionPage() {

  await MiddlewareUtilisateurConnecte();
  
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Se connecterrr
        </h2>
        <ClientConnexionFormulaire />
      </div>
    </div>
  );
}
