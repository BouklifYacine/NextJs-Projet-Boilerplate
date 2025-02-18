'use client';

import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatsBlock } from "./components/Block";
import { Badge } from "@/components/ui/badge";
import { CreditCard, UserPlus, Users, Landmark, UserRound } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useDeleteUsers } from "./(hooks)/UseDashboard";
import toast from "react-hot-toast";

interface Abonnement {
  periode: string;
  datedebut: string;
  datefin: string;
}

interface Utilisateur {
  id: string;
  image?: string;
  name: string;
  email: string;
  plan: "pro" | "free";
  role: "Admin" | "utilisateur";
  createdAt: string;
  abonnement?: Abonnement[];
}

interface StatsAbonnement {
  nombre: number;
  revenus: number;
}

interface Statistiques {
  totalUtilisateurs: number;
  totalAbonnements: number;
  totalRevenus: number;
  statsAbonnements: {
    annuels: StatsAbonnement;
    mensuels: StatsAbonnement;
  };
}

interface TableauDeBordProps {
  utilisateurs: Utilisateur[];
  statistiques: Statistiques;
  MRR: number;
  RevenusParUtilisateurs: number;
}

export const TableauDeBordClient: React.FC<TableauDeBordProps> = ({
  utilisateurs,
  statistiques,
  MRR,
  RevenusParUtilisateurs,
}) => {
  // States pour la gestion de l'UI
  const [utilisateursSelectionnes, setUtilisateursSelectionnes] = useState<string[]>([]);
  const [recherche, setRecherche] = useState("");
  const [filtreabonnement, setFiltreAbonnement] = useState(false);
  const [filtreAdmin, setFiltreAdmin] = useState(false);

  // Hook de mutation pour la suppression
  const { mutate: deleteUsers, isPending } = useDeleteUsers();

  // Filtrage des utilisateurs
  const utilisateurFiltre = useMemo(
    () =>
      utilisateurs.filter((utilisateur) => {
        const correspondancePseudo = utilisateur.name
          .toLowerCase()
          .includes(recherche.toLowerCase());
        const correspondancePlan =
          !filtreabonnement || utilisateur.plan === "pro";
        const conrrespondanceRole =
          !filtreAdmin || utilisateur.role === "Admin";
        return (
          correspondancePseudo && correspondancePlan && conrrespondanceRole
        );
      }),
    [utilisateurs, recherche, filtreabonnement, filtreAdmin]
  );

  const gererSelectionTotale = (coche: boolean) => {
    if (coche) {
      setUtilisateursSelectionnes(utilisateurs.map((user) => user.id));
    } else {
      setUtilisateursSelectionnes([]);
    }
  };

  const gererSelectionUtilisateur = (coche: boolean, idUtilisateur: string) => {
    if (coche) {
      setUtilisateursSelectionnes((prev) => [...prev, idUtilisateur]);
    } else {
      setUtilisateursSelectionnes((prev) =>
        prev.filter((id) => id !== idUtilisateur)
      );
    }
  };

  const gererSuppression = () => {
    if (!utilisateursSelectionnes.length) return;

    deleteUsers(utilisateursSelectionnes, {
      onSuccess: () => {
        toast.success('Utilisateurs supprimés avec succès');
        setUtilisateursSelectionnes([]);
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Erreur lors de la suppression');
      }
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-6 mb-8 mt-4">
        <StatsBlock
          icon={Users}
          title="Nombre utilisateurs"
          value={statistiques.totalUtilisateurs.toString()}
        />
        <StatsBlock
          icon={UserPlus}
          title="Nombre abonnés"
          value={statistiques.totalAbonnements.toString()}
        />
        <StatsBlock
          icon={Landmark}
          title="Revenus total"
          value={`${statistiques.totalRevenus}€`}
        />
        <StatsBlock icon={CreditCard} title="MRR" value={`${MRR}€`} />
        <StatsBlock
          icon={UserRound}
          title="Revenus/users"
          value={`${RevenusParUtilisateurs}€`}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          onClick={() => setFiltreAbonnement(!filtreabonnement)}
          variant={filtreabonnement ? "default" : "outline"}
        >
          Abonnement
        </Button>
        <Button
          onClick={() => setFiltreAdmin(!filtreAdmin)}
          variant={filtreAdmin ? "default" : "outline"}
        >
          Admin
        </Button>
        <Input
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="w-52 mb-5"
          type="text"
          placeholder="Pseudo"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={
                    utilisateursSelectionnes.length === utilisateurs.length
                  }
                  onCheckedChange={gererSelectionTotale}
                />
              </TableHead>
              <TableHead className="font-bold text-black">Avatar</TableHead>
              <TableHead className="font-bold text-black">Role</TableHead>
              <TableHead className="font-bold text-black">Pseudo</TableHead>
              <TableHead className="font-bold text-black">Email</TableHead>
              <TableHead className="font-bold text-black">Créé le</TableHead>
              <TableHead className="font-bold text-black">Abonnement</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {utilisateurFiltre.map((utilisateur) => (
              <TableRow key={utilisateur.id}>
                <TableCell>
                  <Checkbox
                    checked={utilisateursSelectionnes.includes(utilisateur.id)}
                    onCheckedChange={(checked: boolean) =>
                      gererSelectionUtilisateur(checked, utilisateur.id)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {utilisateur.image && (
                    <div className="relative h-10 w-12">
                      <Image
                        src={utilisateur.image}
                        alt={utilisateur.name || "Avatar"}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`
                      ${
                        utilisateur.role === "Admin"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }
                      hover:bg-opacity-80 cursor-default font-medium px-2 py-1
                    `}
                  >
                    {utilisateur.role.charAt(0).toUpperCase() +
                      utilisateur.role.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{utilisateur.name}</TableCell>
                <TableCell>{utilisateur.email}</TableCell>
                <TableCell>
                  {new Date(utilisateur.createdAt).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`
                      ${
                        utilisateur.plan === "pro"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }
                      hover:bg-opacity-80 cursor-default font-medium px-2 py-1
                    `}
                  >
                    {utilisateur.plan.charAt(0).toUpperCase() +
                      utilisateur.plan.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {utilisateursSelectionnes.length > 0 && (
        <div className="flex justify-end mt-4 gap-4">
          <Button 
            variant="destructive" 
            onClick={gererSuppression}
            disabled={isPending}
          >
            {isPending ? 'Suppression...' : `Supprimer (${utilisateursSelectionnes.length})`}
          </Button>
        </div>
      )}
    </div>
  );
};