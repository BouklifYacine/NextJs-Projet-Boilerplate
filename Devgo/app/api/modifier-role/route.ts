import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const { userId, newRole } = await req.json();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Vous devez être connecté" },
        { status: 401 }
      );
    }

    const admin = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (admin?.role !== "Admin") {
      return NextResponse.json(
        { success: false, message: "Action non autorisée" },
        { status: 403 }
      );
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    return NextResponse.json({
      success: true,
      message: "Role changé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la modification du rôle:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Une erreur est survenue lors de la modification du rôle" 
      },
      { status: 500 }
    );
  }
}