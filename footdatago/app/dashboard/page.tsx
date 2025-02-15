import React from "react";
import { getTotalUtilisateurs, GetUtilisateurs } from "./(actions)/Dashboard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
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

const Dashboard = async () => {
  // const session = auth();
  // if (!session) redirect("/");

  const utilisateur = await GetUtilisateurs();
  const TotalUtilisateur = await getTotalUtilisateurs();
  return (
    <div className="container mx-auto">
      <Header></Header>

      <div className="flex flex-col md:flex-row gap-6 mb-8 mt-4">
        <StatsBlock 
          icon={Users}
          title="Nombre utilisateurs"
          value={TotalUtilisateur || "0"}
        />
        <StatsBlock 
          icon={UserPlus}
          title="Nombre abonnés"
          value="0" // À remplacer par la vraie donnée
        />
        <StatsBlock 
          icon={CreditCard}
          title="Revenus"
          value="0€" // À remplacer par la vraie donnée
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-black">Avatar</TableHead>
            <TableHead className="font-bold text-black">Role</TableHead>
            <TableHead className="font-bold text-black">Pseudo</TableHead>
            <TableHead className="font-bold text-black">Email</TableHead>
            <TableHead className="font-bold text-black">Créer le</TableHead>
            <TableHead className="font-bold text-black">Abonnement</TableHead>
            <TableHead className="font-bold text-black">Durée</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;

// Faire trois bloc avec total nombre d'utilisateurs / Total utilisateur abonné / Nombre revenus par mois ou nombre connecté avec providers
