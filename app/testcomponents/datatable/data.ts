// Types pour les données de démonstration
export type User = {
    id: string
    name: string
    email: string
    role: "Admin" | "Utilisateur" | "Modérateur"
    status: "Actif" | "Inactif" | "En attente"
    createdAt: string
}

// Données de démonstration
export const demoData: User[] = [
    { id: "1", name: "Jean Dupont", email: "jean@example.com", role: "Admin", status: "Actif", createdAt: "2024-01-15" },
    { id: "2", name: "Marie Martin", email: "marie@example.com", role: "Utilisateur", status: "Actif", createdAt: "2024-02-20" },
    { id: "3", name: "Pierre Bernard", email: "pierre@example.com", role: "Modérateur", status: "En attente", createdAt: "2024-03-10" },
    { id: "4", name: "Sophie Petit", email: "sophie@example.com", role: "Utilisateur", status: "Inactif", createdAt: "2024-01-25" },
    { id: "5", name: "Lucas Garcia", email: "lucas@example.com", role: "Admin", status: "Actif", createdAt: "2024-04-05" },
    { id: "6", name: "Emma Wilson", email: "emma@example.com", role: "Utilisateur", status: "Actif", createdAt: "2024-02-14" },
    { id: "7", name: "Hugo Thomas", email: "hugo@example.com", role: "Modérateur", status: "En attente", createdAt: "2024-05-01" },
    { id: "8", name: "Léa Robert", email: "lea@example.com", role: "Utilisateur", status: "Actif", createdAt: "2024-03-22" },
    { id: "9", name: "Nathan Richard", email: "nathan@example.com", role: "Utilisateur", status: "Inactif", createdAt: "2024-01-08" },
    { id: "10", name: "Chloé Durand", email: "chloe@example.com", role: "Admin", status: "Actif", createdAt: "2024-06-12" },
    { id: "11", name: "Jules Moreau", email: "jules@example.com", role: "Utilisateur", status: "Actif", createdAt: "2024-04-18" },
    { id: "12", name: "Inès Simon", email: "ines@example.com", role: "Modérateur", status: "En attente", createdAt: "2024-02-28" },
    { id: "13", name: "Louis Laurent", email: "louis@example.com", role: "Utilisateur", status: "Actif", createdAt: "2024-05-15" },
    { id: "14", name: "Camille Lefebvre", email: "camille@example.com", role: "Utilisateur", status: "Inactif", createdAt: "2024-03-03" },
    { id: "15", name: "Raphaël Michel", email: "raphael@example.com", role: "Admin", status: "Actif", createdAt: "2024-06-25" },
]
