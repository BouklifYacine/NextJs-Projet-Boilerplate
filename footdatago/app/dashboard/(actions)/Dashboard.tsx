import { prisma } from "@/prisma";

const PRIX = {
  MENSUEL: 9.99,
  ANNUEL: 50.0,
};

export async function GetUtilisateurs() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        plan: true,
        createdAt: true,
        abonnement: {
          select: {
            periode: true,
            datedebut: true,
            datefin: true,
          },
        },
      },
    });
    return users;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
}

export async function getTotalUtilisateurs() {
  try {
    const totalUtilisateurs = await prisma.user.count();
    return totalUtilisateurs;
  } catch (error) {
    console.error("Erreur lors du comptage des utilisateurs:", error);
    throw error;
  }
}

export async function getTotalAbonnement() {
  const getTotalAbonnement = await prisma.user.count({
    where: {
      plan: "pro",
    },
  });

  return getTotalAbonnement;
}

export async function getAbonnementStats() {
  try {
    const abonnements = await prisma.abonnement.groupBy({
      by: ["periode"],
      _count: {
        periode: true,
      },
      where: {
        datefin: {
          gte: new Date(),
        },
      },
    });

    const statsMensuels = {
      nombre: 0,
      revenus: 0,
    };

    const statsAnnuels = {
      nombre: 0,
      revenus: 0,
    };

    // Calculer les statistiques pour chaque type d'abonnement
    abonnements.forEach((abo) => {
      if (abo.periode === "mois") {
        statsMensuels.nombre = abo._count.periode;
        statsMensuels.revenus = abo._count.periode * PRIX.MENSUEL;
      } else if (abo.periode === "année") {
        statsAnnuels.nombre = abo._count.periode;
        statsAnnuels.revenus = abo._count.periode * PRIX.ANNUEL;
      }
    });

    const totalRevenus = statsMensuels.revenus + statsAnnuels.revenus;
    const mrr = statsMensuels.nombre * PRIX.MENSUEL + (statsAnnuels.nombre * PRIX.ANNUEL) / 12;

    return {
      mensuels: {
        nombre: statsMensuels.nombre,
        revenus: statsMensuels.revenus.toFixed(2),
      },
      annuels: {
        nombre: statsAnnuels.nombre,
        revenus: statsAnnuels.revenus.toFixed(2),
      },
      total: {
        revenus: totalRevenus.toFixed(2),
        mrr: mrr.toFixed(2),
      },
    };
  } catch (error) {
    console.error(
      "Erreur lors du calcul des statistiques d'abonnement:",
      error
    );
    throw error;
  }
}
