import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

export const getUtilisateursAction = createServerFn({ method: "GET" })
  .inputValidator(z.object({ page: z.number() }))
  .handler(async ({ data: { page } }) => {
    const request = getRequest();
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    const sessionId = session?.user?.id;
    if (!sessionId) {
      throw new Error("Vous devez etre connecté");
    }

    const admin = await prisma.user.findUnique({
      where: {
        id: sessionId,
      },
      select: { role: true },
    });

    if (admin?.role !== "Admin") {
      throw new Error("Vous devez etre admin !");
    }

    const PAGE_SIZE = 10;

    const total = await prisma.user.count({
      where: {
        id: {
          not: sessionId,
        },
      },
    });

    const utilisateurs = await prisma.user.findMany({
      skip: page * PAGE_SIZE,
      take: PAGE_SIZE,
      where: {
        id: {
          not: sessionId,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        plan: true,
        banned: true,
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

    return {
      message: "Utilisateurs récupérés avec succès",
      data: utilisateurs,
      total,
      totalPages: Math.ceil(total / PAGE_SIZE),
    };
  });
