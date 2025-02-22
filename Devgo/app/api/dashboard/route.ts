// app/api/dashboard/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { AdminMiddlewareServeur } from "@/app/(middleware)/AdminMiddlewareServeur";


export async function GET() {
  try {

    // await AdminMiddlewareServeur
    const session = await auth();

    const [totalUsers, proUsers, utilisateurs, sessionData] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: { plan: "pro" }
      }),
      prisma.user.findMany({
        take: 10,
        include: { abonnement: true },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.findFirst({
        where: { id: session?.user?.id },
        select: {
          id: true,
          email : true
         
        }
      })
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        proUsers
      },
      utilisateurs,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur de chargement du dashboard" },
      { status: 500 }
    );
  }
}