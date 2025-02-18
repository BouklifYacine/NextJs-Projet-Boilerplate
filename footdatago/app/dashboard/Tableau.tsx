"use client";

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
  utilisateurs: utilisateursInitiaux,
  statistiques: statistiquesInitiales,
  MRR: MRR,
  RevenusParUtilisateurs: RevenusParUtilisateurs,
}) => {
  const [utilisateursLocaux, setUtilisateursLocaux] =
    useState<Utilisateur[]>(utilisateursInitiaux);
  const [statistiquesLocales, setStatistiquesLocales] = useState<Statistiques>(
    statistiquesInitiales
  );
  const [utilisateursSelectionnes, setUtilisateursSelectionnes] = useState<
    string[]
  >([]);
  const [recherche, setRecherche] = useState("");
  const [filtreabonnement, setFiltreAbonnement] = useState(false);
  const [filtreAdmin, setFiltreAdmin] = useState(false);

  const utilisateurFiltre = useMemo(
    () =>
      utilisateursLocaux.filter((utilisateur) => {
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
    [utilisateursLocaux, recherche, filtreabonnement, filtreAdmin]
  );

  const gererSelectionTotale = (coche: boolean) => {
    if (coche) {
      setUtilisateursSelectionnes(utilisateursLocaux.map((user) => user.id));
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
    const utilisateursRestants = utilisateursLocaux.filter(
      (user) => !utilisateursSelectionnes.includes(user.id)
    );

    const nouveauTotalUtilisateurs = utilisateursRestants.length;
    const nouveauTotalAbonnements = utilisateursRestants.filter(
      (user) => user.abonnement && user.abonnement.length > 0
    ).length;

    const nouveauxAbonnementsAnnuels = utilisateursRestants.filter(
      (user) => user.abonnement?.[0]?.periode === "Annuel"
    ).length;
    const nouveauxAbonnementsMensuels = utilisateursRestants.filter(
      (user) => user.abonnement?.[0]?.periode === "Mensuel"
    ).length;

    setUtilisateursLocaux(utilisateursRestants);
    setStatistiquesLocales((prev) => ({
      ...prev,
      totalUtilisateurs: nouveauTotalUtilisateurs,
      totalAbonnements: nouveauTotalAbonnements,
      statsAbonnements: {
        annuels: { nombre: nouveauxAbonnementsAnnuels },
        mensuels: { nombre: nouveauxAbonnementsMensuels },
      },
    }));

    setUtilisateursSelectionnes([]);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-6 mb-8 mt-4">
        <StatsBlock
          icon={Users}
          title="Nombre utilisateurs"
          value={statistiquesLocales.totalUtilisateurs.toString()}
        />
        <StatsBlock
          icon={UserPlus}
          title="Nombre abonnés"
          value={statistiquesLocales.totalAbonnements.toString()}
        />
        <StatsBlock
          icon={Landmark}
          title="Revenus total"
          value={`${statistiquesLocales.totalRevenus}€`}
        />
        <StatsBlock icon={CreditCard} title="MRR" value={MRR + "€"} />
        <StatsBlock
          icon={UserRound}
          title="Revenus/users "
          value={RevenusParUtilisateurs + "€"}
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
                    utilisateursSelectionnes.length ===
                    utilisateursLocaux.length
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
          <Button variant="destructive" onClick={gererSuppression}>
            Supprimer ({utilisateursSelectionnes.length})
          </Button>
        </div>
      )}
    </div>
  );
};
