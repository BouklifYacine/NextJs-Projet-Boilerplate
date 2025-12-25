import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { auth } from "@/auth";
import { BarreLaterale } from "@/features/parametres/components/BarreLatérale";
import Header from "@/features/landingpage/components/header";

const checkParametresAccess = createServerFn({ method: "GET" })
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data: { userId } }) => {
    const request = getRequest();
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      throw redirect({
        to: "/connexion",
      });
    }

    if (session.user.id !== userId) {
      throw redirect({
        to: "/parametres/$userId",
        params: { userId: session.user.id },
      });
    }

    return null;
  });

export const Route = createFileRoute("/parametres/$userId")({
  beforeLoad: async ({ params }) => {
    await checkParametresAccess({ data: { userId: params.userId } });
  },
  component: ParametresPage,
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
