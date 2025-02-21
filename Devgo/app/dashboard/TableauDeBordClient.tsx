"use client";

import React, { useMemo, useState } from "react";
import { useDeleteUsers, useModifierRole } from "./(hooks)/UseDashboard";
import toast from "react-hot-toast";
import { TableauDeBordProps } from "./(interface-types)/Interface-Types";
import { Filtres } from "./components/Filtres";
import { SectionStats } from "./components/SectionStats";
import { UsersTable } from "./components/Tableau";
import { Role } from "./(interface-types)/Interface-Types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const TableauDeBordClient: React.FC<TableauDeBordProps> = ({ utilisateurs, statistiques, MRR, RevenusParUtilisateurs, page, setPage , totalPages}) => {
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

      <Filtres
        filtreabonnement={filtreabonnement}
        setFiltreAbonnement={setFiltreAbonnement}
        filtreAdmin={filtreAdmin}
        setFiltreAdmin={setFiltreAdmin}
        recherche={recherche}
        setRecherche={setRecherche}
      ></Filtres>

      <UsersTable
        utilisateurFiltre={utilisateurFiltre}
        utilisateursSelectionnes={utilisateursSelectionnes}
        loadingUsers={loadingUsers}
        gererSelectionTotale={gererSelectionTotale}
        gererSelectionUtilisateur={gererSelectionUtilisateur}
        handleRoleChange={handleRoleChange}
        gererSuppression={gererSuppression}
        isPending={isPending}
        utilisateurs={utilisateurs}
      />

<div className="flex justify-center gap-2 my-4 ">
<Button 
    variant="outline"
    onClick={() => setPage((pageActuelle) => Math.max(pageActuelle - 1, 0))}
    disabled={page === 0}
    className={`${
      page === 0 
        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed" 
        : "bg-white text-gray-900 hover:bg-gray-100"
    }`}
>
    <ChevronLeft />
</Button>

<span className="flex items-center px-4">
    Page {page + 1} sur {totalPages}
</span>

<Button
    variant="outline"
    onClick={() => setPage((pageActuelle) => pageActuelle + 1)}
    disabled={page >= totalPages - 1}
    className={`${
      page >= totalPages - 1
        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
        : "bg-white text-gray-900 hover:bg-gray-100"
    }`}
>
    <ChevronRight />
</Button>
      </div>
    </div>
  );
};
