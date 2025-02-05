import CodeConfirmation from "@/app/(emails)/CodeConfirmation";
import { sendEmail } from "@/app/utils/email";
import { prisma } from "@/prisma";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { createElement } from "react";

interface Props {
    params : {id : string}
}

export async function POST(request : NextRequest , {params} : Props) {
    
    const {id} = await params 
    const {motdepasse} = await request.json()

      if (!motdepasse)
        return NextResponse.json("Vous devez mettre un mot de passe ", { status: 400 });
    
      const utilisateur = await prisma.user.findUnique({
        where: { id },
      });

        const pseudoutilisateur = utilisateur?.name;
      
        if (!utilisateur || !(await compare(motdepasse, utilisateur.password!)))
          return NextResponse.json(
            "Cet utilisateur n'existe pas ou le mot de passe n'est pas le bon",
            { status: 400 }
          );

          const heureenminute = 60 * 60 * 1000;
          const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
          const expirationcode = new Date(Date.now() + heureenminute);

          await prisma.user.update({
            where: { id },
            data: {
              resetToken: resetCode,
              resetTokenExpiry: expirationcode,
            },
          });

          const emailElement = createElement(CodeConfirmation, {
            resetCode,
            pseudo: pseudoutilisateur || "Utilisateur",
          });
        
          await sendEmail({
            to: utilisateur.email || "",
            subject: "Code de réinitialisation",
            emailComponent: emailElement,
          });

          return NextResponse.json({
            message:
              "Le code pour changer votre pseudo a été envoyer a votre adresse email",
          });
}

export async function PATCH(request: NextRequest , {params} : Props){
    const {id} = await params 
}