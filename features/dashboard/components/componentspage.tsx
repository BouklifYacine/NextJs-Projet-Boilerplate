import { Suspense, useState } from "react";
import { TableauDeBordClient } from "./TableauDeBordClient";
import { useStats, useUtilisateurs } from "../hooks/UseDashboard";
import { DashboardSkeleton } from "./dashboard-skeleton";

function DashboardContent() {
  const [page, setPage] = useState(0);

  // With useSuspenseQuery, data is ALWAYS defined (no loading/error checks needed)
  const { data: dataStats } = useStats();
  const { data: dataUtilisateur } = useUtilisateurs(page);

  const utilisateurs = dataUtilisateur.data;
  const totalPages = dataUtilisateur.totalPages;
  const totalUtilisateurs = dataStats.data.users.total;
  const totalAbonnements = dataStats.data.users.pro;
  const statsAbonnements = {
    annuels: dataStats.data.abonnements.annuels,
    mensuels: dataStats.data.abonnements.mensuels,
  };
  const totalRevenus = Number(dataStats.data.abonnements.total.revenus);
  const MRR = Number(dataStats.data.abonnements.total.mrr);

  const RevenusParUtilisateurs =
    totalUtilisateurs > 0
      ? Number((totalRevenus / totalUtilisateurs).toFixed(2))
      : 0;

  const statistiques = {
    totalUtilisateurs,
    totalAbonnements,
    totalRevenus,
    statsAbonnements,
  };

  return (
    <TableauDeBordClient
      utilisateurs={utilisateurs}
      statistiques={statistiques}
      MRR={MRR}
      RevenusParUtilisateurs={RevenusParUtilisateurs}
      page={page}
      setPage={setPage}
      totalPages={totalPages}
    />
  );
}

const ComponentPage = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
};

export default ComponentPage;
