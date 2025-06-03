import { AdminMiddlewareClient } from "../(middleware)/AdminMiddlewareClient";
import { StatsBlock } from "../dashboard/components/Block";
import ComponentPage from "../dashboard/components/componentspage";
import { Users, Activity, DollarSign } from "lucide-react";

export default async function Page() {
  await AdminMiddlewareClient();

  return (
    <div className="flex flex-col md:flex-row justify-center gap-4">
      <StatsBlock icon={Users} value={"125"} title="Utilisateurs" />
      <StatsBlock icon={Activity} value={"85%"} title="Activité" />
      <StatsBlock icon={DollarSign} value={"1250€"} title="Revenus" />
    </div>
  );
}
