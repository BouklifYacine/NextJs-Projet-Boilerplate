import { createFileRoute } from "@tanstack/react-router";
import ComponentPage from "@/features/dashboard/components/componentspage";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4">
      <ComponentPage />
    </div>
  );
}
