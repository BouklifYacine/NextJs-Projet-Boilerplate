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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Dashboard = async () => {
  const utilisateur = await GetUtilisateurs();
  const TotalUtilisateur = await getTotalUtilisateurs();
  const TotalAbonnement = await getTotalAbonnement();
  const StatsAbonnement = await getAbonnementStats();
  const TotalRevenus = StatsAbonnement.total.revenus;
  const RevenusParUtilisateur =  Number(TotalRevenus) / TotalUtilisateur 

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
          title="Nombre abonnements"
          value={TotalAbonnement}
        />
        <StatsBlock
          icon={CreditCard}
          title="Revenus total"
          value={TotalRevenus + "€"}
        />
        <StatsBlock
          icon={CreditCard}
          title="MRR"
          value={StatsAbonnement.total.mrr + "€"}
        />
        <StatsBlock
          icon={CreditCard}
          title="Revenus par client"
          value={RevenusParUtilisateur.toFixed(2) + "€"}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Checkbox ></Checkbox></TableHead>
              <TableHead className="font-bold text-black ">Avatar</TableHead>
              <TableHead className="font-bold text-black ">Role</TableHead>
              <TableHead className="font-bold text-black ">Pseudo</TableHead>
              <TableHead className="font-bold text-black ">Email</TableHead>
              <TableHead className="font-bold text-black ">Créé le</TableHead>
              <TableHead className="font-bold text-black ">Abonnement</TableHead>
              <TableHead className="font-bold text-black ">Durée</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {utilisateur.map((user) => (
              <TableRow key={user.id}>
                <TableCell><Checkbox></Checkbox></TableCell>
                <TableCell className="font-medium">
                  {user.image && (
                    <div className="relative h-10 w-12">
                      <Image
                        src={user.image}
                        alt={user.name || "Avatar"}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell> <Badge className={`${user.plan === "pro" ? "bg-green-500 text-white" : "bg-red-500 text-white"} `}>{user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}</Badge></TableCell>
                <TableCell>
                  {user.abonnement?.[0]?.periode || "Aucun"}
                </TableCell>
                <TableCell>
                  {user.abonnement?.[0] ? (
                    <span>
                      {new Date(user.abonnement[0].datedebut).toLocaleDateString("fr-FR")} 
                      {" - "}
                      {new Date(user.abonnement[0].datefin).toLocaleDateString("fr-FR")}
                    </span>
                  ) : (
                    "-"
                  )}
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mt-4 gap-4">
<Button variant="destructive"> Supprimer  </Button> <Button> Yacine </Button>
      </div>
    </div>
  );
};

export default Dashboard;