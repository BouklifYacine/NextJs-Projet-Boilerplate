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
import { CreditCard, UserPlus, Users, Landmark, UserRound } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDeleteUsers, useModifierRole } from "./(hooks)/UseDashboard";
import toast from "react-hot-toast";
import { RoleSelect } from "./components/select";
import BadgeAbonnement from "./components/BadgeAbonnement";
import { TableauDeBordProps } from "./(interface-types)/Interface-Types";
import BadgeRole from "./components/BadgeRole";
import { Filtres } from "./components/Filtres";
import { SectionStats } from "./components/SectionStats";

 type Role = "Admin" | "utilisateur";

export const TableauDeBordClient: React.FC<TableauDeBordProps> = ({
  utilisateurs,
  statistiques,
  MRR,
  RevenusParUtilisateurs,
}) => {
  const [utilisateursSelectionnes, setUtilisateursSelectionnes] = useState<
    string[]
  >([]);
  const [recherche, setRecherche] = useState("");
  const [filtreabonnement, setFiltreAbonnement] = useState(false);
  const [filtreAdmin, setFiltreAdmin] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState<Record<string, boolean>>({});

  const { mutate: deleteUsers, isPending } = useDeleteUsers();
  const { mutate: modifierRole } = useModifierRole();

  const handleRoleChange = async (userId: string, newRole: Role) => {
    setLoadingUsers((prev) => ({ ...prev, [userId]: true }));

    modifierRole(
      {
        userId,
        newRole,
      },
      {
        onSuccess: () => {
          setLoadingUsers((prev) => ({ ...prev, [userId]: false }));
        },
        onError: () => {
          setLoadingUsers((prev) => ({ ...prev, [userId]: false }));
        },
      }
    );
  };

  const utilisateurFiltre = useMemo(
    () =>
      utilisateurs.filter((utilisateur) => {
        const correspondancePseudo = utilisateur?.name
          ?.toLowerCase()
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
        toast.success("Utilisateurs supprimés avec succès");
        setUtilisateursSelectionnes([]);
      },
      onError: (error: Error) => {
        toast.error(error.message || "Erreur lors de la suppression");
      },
    });
  };

  return (
    <div className="container mx-auto">
     <SectionStats
  statistiques={statistiques}
  MRR={MRR}
  RevenusParUtilisateurs={RevenusParUtilisateurs}
/>

      <Filtres  filtreabonnement={filtreabonnement}
        setFiltreAbonnement={setFiltreAbonnement}
        filtreAdmin={filtreAdmin}
        setFiltreAdmin={setFiltreAdmin}
        recherche={recherche}
        setRecherche={setRecherche}></Filtres>

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
                  <div className="relative h-10 w-10">
                    {utilisateur.image ? (
                      <Image
                        src={utilisateur.image}
                        alt={utilisateur.name || "Avatar"}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-black">
                        {utilisateur?.name?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <BadgeRole utilisateur={utilisateur}></BadgeRole>
                </TableCell>
                <TableCell>{utilisateur.name}</TableCell>
                <TableCell>{utilisateur.email}</TableCell>
                <TableCell>
                  {new Date(utilisateur.createdAt).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <BadgeAbonnement
                      utilisateur={utilisateur}
                    ></BadgeAbonnement>

                    <RoleSelect
                      RoleActuel={utilisateur.role}
                      isLoading={loadingUsers[utilisateur.id]}
                      onRoleChange={(newRole) =>
                        handleRoleChange(utilisateur.id, newRole)
                      }
                    />
                  </div>
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
            {isPending
              ? "Suppression..."
              : `Supprimer (${utilisateursSelectionnes.length})`}
          </Button>
        </div>
      )}
    </div>
  );
};
