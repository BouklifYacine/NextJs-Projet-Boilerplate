import { prisma } from "@/prisma";

export async function GetUtilisateurs() {
  const users = await prisma.user.findMany({
    select: {
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
}

export async function getTotalUtilisateurs() {
  const TotalUtilisateur = await prisma.user.count();
  return TotalUtilisateur;
}

export async function getTotalAbonnement() {
  const getTotalAbonnement = await prisma.user.count({
    where: {
      plan: "pro",
    },
  });

  return getTotalAbonnement;
}


