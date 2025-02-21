import CodeConfirmation from "@/app/(emails)/CodeConfirmation";
import EmailChangementPseudo from "@/app/(emails)/EmailChangementPseudo";
import { sendEmail } from "@/app/utils/email";
import { prisma } from "@/prisma";
import { SchemaChangementPseudo } from "@/schema/SchemaParametre";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { createElement } from "react";

interface Props {
  params: {
    // L'id ici doit s'appeler EXACTEMENT de la meme manière que le dossier id encadré ici j'ia mis [id] donc je dois mettre id ici
    id: string;
  };
}

// Enlever les id quand on a fini de faire les test et remplacer par session ca sera plus simple comme cela
// Enlever donc le dossier [id] et donc tout mettre dans le dossier paramètre

export async function POST(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const { motdepasse } = await request.json();

  if (!motdepasse)
    return NextResponse.json("Vous devez mettre un mot de passe ", {
      status: 400,
    });

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

export async function PATCH(request: NextRequest, { params }: Props) {
  const { id } = await params;

  const body = await request.json();

  const { pseudo, codeverification } = body;

  const validation = SchemaChangementPseudo.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { message: validation.error.errors[0].message },
      { status: 400 }
    );
  }

  const utilisateur = await prisma.user.findFirst({
    where: {
      id,
      resetToken: codeverification,
      resetTokenExpiry: {
        gt: new Date(),
      },
    },
    select: {
      id: true,
      email: true,
      resetToken: true,
      name: true,
    },
  });

  if (!codeverification) {
    return NextResponse.json(
      { error: "Code de vérification requis" },
      { status: 400 }
    );
  }

  if (!utilisateur)
    return NextResponse.json(
      "Cet utilisateur n'existe pas ou le code n'est pas bon",
      { status: 400 }
    );

    const utilisateurpseudo = await prisma.user.findUnique({
        where: { name: pseudo },
      });
      
      if (utilisateurpseudo)
        return NextResponse.json({
          message: "Ce pseudo est déja pris",
        }, { status: 400 });
      

  const nouveaupseudo = await prisma.user.update({
    where: { id },
    data: { 
        name: pseudo, 
        resetToken : null,
        resetTokenExpiry : null 
     },
  });

   const emailelement = createElement(EmailChangementPseudo, { pseudo : utilisateur.name || "" , name : nouveaupseudo.name || ""})

   await sendEmail({
    to: utilisateur.email || "", 
    subject : "Changement de pseudo",
    emailComponent : emailelement
   })

  return NextResponse.json({
    message: "Votre nouveau pseudo est : " + nouveaupseudo.name,
  });
}
