import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

interface StatsAbonnement {
  nombre: number;
  revenus: number;
}

interface StatsAccumulator {
  mensuels: StatsAbonnement;
  annuels: StatsAbonnement;
}
interface AbonnementResult {
  periode: string;
  _count: {
    periode: number;
  };
}

const PRIX = {
  MENSUEL: 5,
  ANNUEL: 50.0,
} as const;

export const getStatsAction = createServerFn({ method: "GET" }).handler(
  async () => {
    const request = getRequest();
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      throw new Error("Vous devez etre connecté");
    }

    const admin = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (admin?.role !== "Admin") {
      throw new Error("Accès non autorisé");
    }

    const [totalUsers, totalPro, abonnements] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { plan: "pro" } }),
      prisma.abonnement.groupBy({
        by: ["periode"],
        _count: { periode: true },
        where: { datefin: { gte: new Date() } },
      }),
    ]);

    const initialStats: StatsAccumulator = {
      mensuels: { nombre: 0, revenus: 0 },
      annuels: { nombre: 0, revenus: 0 },
    };

    const stats = abonnements.reduce(
      (acc: StatsAccumulator, abo: AbonnementResult) => {
        if (abo.periode === "mois") {
          acc.mensuels.nombre = abo._count.periode;
          acc.mensuels.revenus = parseFloat(
            (abo._count.periode * PRIX.MENSUEL).toFixed(2)
          );
        } else if (abo.periode === "année") {
          acc.annuels.nombre = abo._count.periode;
          acc.annuels.revenus = parseFloat(
            (abo._count.periode * PRIX.ANNUEL).toFixed(2)
          );
        }
        return acc;
      },
      initialStats
    );

    const totalRevenus = stats.mensuels.revenus + stats.annuels.revenus;
    const mrr =
      stats.mensuels.nombre * PRIX.MENSUEL +
      (stats.annuels.nombre * PRIX.ANNUEL) / 12;

    return {
      data: {
        users: {
          total: totalUsers,
          pro: totalPro,
        },
        abonnements: {
          ...stats,
          total: {
            revenus: totalRevenus.toFixed(2),
            mrr: mrr.toFixed(2),
          },
        },
      },
    };
  }
);
