'use client';

import React from "react";
import Header from "@/components/header";
import { TableauDeBordClient } from "./Tableau";
import { useStats, useUtilisateurs } from "./(hooks)/UseDashboard";

const TableauDeBord = () => {
  const { 
    data: dataStats, 
    isLoading: isLoadingStats,
    error: statsError 
  } = useStats();

  const { 
    data: dataUtilisateur, 
    isLoading: isLoadingUtilisateur,
    error: utilisateursError 
  } = useUtilisateurs();

  if (isLoadingStats || isLoadingUtilisateur) {
    return <p>Ca charge khouya...</p>;
  }

  if (statsError || utilisateursError || !dataStats || !dataUtilisateur) {
    return <p>Une erreur est survenue lors du chargement des données</p>;
  }


  const utilisateurs = dataUtilisateur.data;
  const totalUtilisateurs = dataStats.data.users.total;
  const totalAbonnements = dataStats.data.users.pro; 
  const statsAbonnements = {
    annuels: dataStats.data.abonnements.annuels,
    mensuels: dataStats.data.abonnements.mensuels
  };
  const totalRevenus = Number(dataStats.data.abonnements.total.revenus);
  const MRR = Number(dataStats.data.abonnements.total.mrr);
  const RevenusParUtilisateurs = totalUtilisateurs > 0 
    ? (totalRevenus / totalUtilisateurs)
    : 0;

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