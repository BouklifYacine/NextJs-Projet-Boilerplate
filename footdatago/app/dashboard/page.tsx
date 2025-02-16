import React from "react";
import {
  getAbonnementStats,
  getTotalAbonnement,
  getTotalUtilisateurs,
  GetUtilisateurs,
} from "./(actions)/Dashboard";
import Header from "@/components/header";
import { TableauDeBordClient } from ".//Tableau";

const TableauDeBord = async () => {

  const utilisateurs = await GetUtilisateurs();
  const totalUtilisateurs = await getTotalUtilisateurs();
  const totalAbonnements = await getTotalAbonnement();
  const statsAbonnements = await getAbonnementStats();
  const totalRevenus = statsAbonnements.total.revenus;
  const MRR = Number(statsAbonnements.total.mrr)


  const statistiques = {
    totalUtilisateurs,
    totalAbonnements,
    statsAbonnements,
    totalRevenus
  };

  return (
    <>
      <Header />
      <TableauDeBordClient utilisateurs={utilisateurs} statistiques={statistiques} MRR={MRR} />
    </>
  );
};

export default TableauDeBord;