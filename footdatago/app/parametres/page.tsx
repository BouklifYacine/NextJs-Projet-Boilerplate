// app/parametres/page.tsx
import { Metadata } from "next"
import { BarreLaterale } from "./_components/BarreLatérale"

export const metadata: Metadata = {
  title: "Paramètres | Liverpool FC",
  description: "Gérez vos paramètres de compte",
}

export default async function PageParametres() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Paramètres</h1>
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <BarreLaterale />
        </div>
      </div>
    </>
  )
}