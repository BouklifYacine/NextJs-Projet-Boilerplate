import React from "react";
import {
  getAbonnementStats,
  getTotalAbonnement,
  getTotalUtilisateurs,
  GetUtilisateurs,
} from "./(actions)/Dashboard";
import Header from "@/components/header";
import { TableauDeBordClient } from ".//Tableau";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma";

const TableauDeBord = async () => {
  const utilisateurs = await GetUtilisateurs();
  const totalUtilisateurs = await getTotalUtilisateurs();
  const totalAbonnements = await getTotalAbonnement();
  const statsAbonnements = await getAbonnementStats();
  const totalRevenus = statsAbonnements.total.revenus;
  const MRR = Number(statsAbonnements.total.mrr);
  const RevenusParUtilisateurs = (
    Number(totalRevenus) / totalUtilisateurs
  ).toFixed(2);

  const session = await auth();
  if (!session?.user?.id) redirect("/");
  
  const user = await prisma.user.findUnique({ 
    where: { id: session.user.id },
    select: { role: true } 
  });
  
  if (!user || user.role !== "Admin") redirect("/");

  const statistiques = {
    totalUtilisateurs,
    totalAbonnements,
    statsAbonnements,
    totalRevenus
  };

  return (
    <>
      <Header />
      <TableauDeBordClient
        utilisateurs={utilisateurs}
        statistiques={statistiques}
        MRR={MRR}
        RevenusParUtilisateurs={RevenusParUtilisateurs}
      />
    </>
  );
};

export default TableauDeBord;
