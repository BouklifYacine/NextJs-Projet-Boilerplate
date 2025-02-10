import { redirect } from "next/navigation"
import { BarreLaterale } from "../_components/BarreLatérale"
import { auth } from "@/auth"
import Header from "@/components/header"

export default async function PageParametres({
  params
}: {
  params: { id: string }
}) {
  const session = await auth()
  
  console.log("Session complète:", session)
  console.log("ID de l'URL:", await params.id)
  console.log("ID de la session:", session?.user?.id)
  
  if (!session?.user) {
    console.log("Pas de session, redirection vers /connexion")
    redirect('/connexion')
  }

  if (session.user.id !== await params.id) {
    console.log("ID ne correspond pas, redirection vers:", '/parametres/' + session.user.id)
    redirect('/parametres/' + session.user.id)
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Paramètres</h1>
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <BarreLaterale userId={await params.id} />
        </div>
      </div>
    </>
  )
}