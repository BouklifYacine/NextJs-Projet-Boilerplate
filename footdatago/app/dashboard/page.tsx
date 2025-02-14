import React from "react";
import { getTotalUtilisateurs, GetUtilisateurs } from "./(actions)/Dashboard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = auth();
  if (!session) redirect("/");
  
  const utilisateur = await GetUtilisateurs();
  const TotalUtilisateur = await getTotalUtilisateurs();
  return (
    <div className="">
      {utilisateur.map((user) => (
        <div className="flex gap-4" key={user.id}>
          <div>Nombre d'utilisateurs : {TotalUtilisateur}</div>
          <nav>{user.name}</nav>
          <nav>{user.email}</nav>
          <nav>{user.createdAt.toLocaleDateString()}</nav>
          <nav>{user.plan}</nav>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

// Faire trois bloc avec total nombre d'utilisateurs / Total utilisateur abonné / Nombre revenus par mois ou nombre connecté avec providers 