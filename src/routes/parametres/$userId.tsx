import { createFileRoute } from "@tanstack/react-router";
import { BarreLaterale } from "@/features/parametres/components/BarreLatérale";
import Header from "@/features/landingpage/components/header";
import { checkParametresAccess } from "@/features/parametres/server/CheckParametersAcces.server";

export const Route = createFileRoute("/parametres/$userId")({
  beforeLoad: async ({ params }) => {
    await checkParametresAccess({ data: { userId: params.userId } });
  },
  onError: ({ error }) => {
    console.error(error);
  },
  component: ParametresPage,
  pendingComponent: () => <div>Loading...</div>,
});

function ParametresPage() {
  const { userId } = Route.useParams();

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Paramètres</h1>
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <BarreLaterale userId={userId} />
        </div>
      </div>
    </>
  );
}
