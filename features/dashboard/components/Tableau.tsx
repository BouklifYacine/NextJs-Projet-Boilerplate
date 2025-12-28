import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Image } from "@unpic/react";
import BadgeRole from "./BadgeRole";
import BadgeAbonnement from "./BadgeAbonnement";
import { Role, Utilisateur } from "../interfaces/Interface-Types";
import BadgeTypeAbonnement from "./BadgeTypeAbonnement";
import { useSession } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface UsersTableProps {
  utilisateurFiltre: Utilisateur[];
  utilisateursSelectionnes: string[];
  loadingUsers: Record<string, boolean>;
  gererSelectionTotale: (checked: boolean) => void;
  gererSelectionUtilisateur: (checked: boolean, id: string) => void;
  handleRoleChange: (userId: string, newRole: Role) => void;
  gererSuppression: () => void;
  isPending: boolean;
  utilisateurs: Utilisateur[];
}

export const UsersTable: React.FC<UsersTableProps> = ({
  utilisateurFiltre,
  utilisateursSelectionnes,
  loadingUsers,
  gererSelectionTotale,
  gererSelectionUtilisateur,
  handleRoleChange,
  gererSuppression,
  isPending,
  utilisateurs,
}) => {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  // Filtrer les utilisateurs sélectionnables (pas soi-même) pour la sélection totale
  const selectionnableUsers = utilisateurs.filter(
    (user) => user.id !== currentUserId
  );
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={
                    utilisateursSelectionnes.length > 0 &&
                    utilisateursSelectionnes.length ===
                      selectionnableUsers.length
                  }
                  onCheckedChange={gererSelectionTotale}
                  disabled={selectionnableUsers.length === 0}
                />
              </TableHead>
              <TableHead className="font-bold text-black dark:text-white">
                Avatar
              </TableHead>
              <TableHead className="font-bold text-black dark:text-white">
                Role
              </TableHead>
              <TableHead className="font-bold text-black dark:text-white">
                Pseudo
              </TableHead>
              <TableHead className="font-bold text-black dark:text-white">
                Email
              </TableHead>
              <TableHead className="font-bold text-black dark:text-white">
                Rejoint le
              </TableHead>
              <TableHead className="font-bold text-black dark:text-white">
                Abonnement
              </TableHead>
              <TableHead className="font-bold text-black dark:text-white">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {utilisateurFiltre.map((utilisateur) => {
              const isSelf = utilisateur.id === currentUserId;

              return (
                <TableRow key={utilisateur.id}>
                  <TableCell>
                    <Checkbox
                      checked={utilisateursSelectionnes.includes(
                        utilisateur.id
                      )}
                      onCheckedChange={(checked: boolean) =>
                        gererSelectionUtilisateur(checked, utilisateur.id)
                      }
                      disabled={isSelf}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {utilisateur.image ? (
                        <Image
                          src={utilisateur.image}
                          alt={utilisateur.name || "Avatar"}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full absolute inset-0 rounded-full"
                        />
                      ) : (
                        <span className="text-black text-lg font-bold">
                          {utilisateur?.name?.[0]?.toUpperCase() || "?"}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <BadgeRole utilisateur={utilisateur} />
                  </TableCell>
                  <TableCell>{utilisateur.name}</TableCell>
                  <TableCell>{utilisateur.email}</TableCell>
                  <TableCell>
                    {new Date(utilisateur.createdAt).toLocaleDateString(
                      "fr-FR"
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <BadgeAbonnement utilisateur={utilisateur} />
                      {utilisateur.abonnement?.periode && (
                        <BadgeTypeAbonnement
                          abonnement={utilisateur.abonnement.periode}
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Ouvrir le menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Rôles</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          checked={utilisateur.role === "Admin"}
                          onCheckedChange={() =>
                            handleRoleChange(utilisateur.id, "Admin")
                          }
                          disabled={loadingUsers[utilisateur.id]}
                        >
                          Administrateur
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={utilisateur.role === "utilisateur"}
                          onCheckedChange={() =>
                            handleRoleChange(utilisateur.id, "utilisateur")
                          }
                          disabled={loadingUsers[utilisateur.id]}
                        >
                          Utilisateur
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuSeparator />
                        {/* Future features can be added here */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
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
    </>
  );
};
