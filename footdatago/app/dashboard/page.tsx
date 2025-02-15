import React from "react";
import {
  getAbonnementStats,
  getTotalAbonnement,
  getTotalUtilisateurs,
  GetUtilisateurs,
} from "./(actions)/Dashboard";
import Header from "@/components/header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatsBlock } from "./components/Block";
import { CreditCard, UserPlus, Users } from "lucide-react";
import Image from "next/image";

const Dashboard = async () => {
  const utilisateur = await GetUtilisateurs();
  const TotalUtilisateur = await getTotalUtilisateurs();
  const TotalAbonnement = await getTotalAbonnement();
  const StatsAbonnement = await getAbonnementStats();
  const TotalRevenus = StatsAbonnement.total.revenus;

  return (
    <div className="container mx-auto">
      <Header />

      <div className="flex flex-col md:flex-row gap-6 mb-8 mt-4">
        <StatsBlock
          icon={Users}
          title="Nombre utilisateurs"
          value={TotalUtilisateur || "0"}
        />
        <StatsBlock
          icon={UserPlus}
          title="Nombre abonnés"
          value={TotalAbonnement}
        />
        <StatsBlock
          icon={CreditCard}
          title="Revenus total"
          value={TotalRevenus + "€"}
        />
        <StatsBlock
          icon={CreditCard}
          title="Abos Annuel"
          value={StatsAbonnement.annuels.nombre}
        />
        <StatsBlock
          icon={CreditCard}
          title="Abo Mensuel"
          value={StatsAbonnement.mensuels.nombre}
        />
      </div>

      <div className="rounded-md border">
       
      </div>
    </div>
  );
};

export default Dashboard;