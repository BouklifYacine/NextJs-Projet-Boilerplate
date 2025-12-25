import { authMiddleware } from "@/src/middleware/auth";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { BoutonDeconnexion } from "@/components/Buttons/BoutonDéconnexion";

const getSessionData = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return { user: context.user };
  });

export const Route = createFileRoute("/test-session/")({
  component: RouteComponent,
  loader: async () => {
    return await getSessionData();
  },
});

function RouteComponent() {
  const { user } = Route.useLoaderData();

  // Also log on client side
  console.log("=== CLIENT SESSION DATA ===");
  console.log(user);
  console.log("===========================");

  return (
    <main className="min-h-svh bg-muted flex flex-col items-center justify-center p-6">
      <div className="bg-background rounded-2xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-6">Session Test Page</h1>
        <p className="text-muted-foreground mb-4">
          Check your terminal console for the server-side session log.
          <br />
          Check your browser console for the client-side session log.
        </p>

        <div className="bg-muted rounded-lg p-4 overflow-auto mb-6">
          <h2 className="font-semibold mb-2">User Data:</h2>
          <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
        </div>

        <BoutonDeconnexion />
      </div>
    </main>
  );
}
