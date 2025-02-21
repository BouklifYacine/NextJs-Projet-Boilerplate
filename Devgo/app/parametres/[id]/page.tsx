import { redirect } from "next/navigation";
import { BarreLaterale } from "../_components/BarreLatérale";
import { auth } from "@/auth";
import Header from "@/components/header";

interface Props {
  params: { id: string };
}

export default async function PageParametres({ params }: Props) {
  const session = await auth();
  const { id } = await params;

  if (!session?.user) {
    redirect("/connexion");
  }

  if (session.user.id !== id) {
    redirect(`/parametres/${session.user.id}`);
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Paramètres</h1>
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <BarreLaterale userId={id} />
        </div>
      </div>
    </>
  );
}
