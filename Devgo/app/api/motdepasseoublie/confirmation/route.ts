
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { ResetPasswordSchema } from "@/app/(schema)/SchemaMotDepasse";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {

    const body = await request.json();
    
    const validation = ResetPasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const { code, email, newPassword } = body

    const user = await prisma.user.findFirst({
      where: {
        email,
        resetToken: code,
        resetTokenExpiry: {
          gt: new Date(),
        },
        
      },
      include : {accounts : true}
    });

    if (!user) {
      return NextResponse.json(
        { message: "Code invalide ou expiré" },
        { status: 400 }
      );
    }

    const ctx = await auth.$context;
    const hashedPassword = await ctx.password.hash(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    const account = await prisma.account.findFirst({
      where: {
        userId: user.id,
      }
    });
    
    if (account) {
      await prisma.account.update({
        where: { id: account.id },
        data: {
          password: hashedPassword
        }
      });
    }

    return NextResponse.json({ message: "Mot de passe mis à jour" });
  } catch (error) {
    return NextResponse.json(
      { message: error || "erreur serveur"  },
      { status: 500 }, 
      
    );
  }
}