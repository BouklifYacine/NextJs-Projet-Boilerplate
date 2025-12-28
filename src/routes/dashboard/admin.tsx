import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "@/features/admin/components";

export const Route = createFileRoute("/dashboard/admin")({
  component: AdminPage,
});

function AdminPage() {
  return <AdminDashboard />;
}
