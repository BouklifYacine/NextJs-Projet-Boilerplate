import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { createElement } from "react";
import { sendEmail } from "@/app/utils/email";
import CodeConfirmation from "@/app/(emails)/CodeConfirmation";
import SuppressionCompte from "@/app/(emails)/SuppressionCompte";

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
      "Le code pour supprimer votre compte a été envoyer a votre adresse email",
  });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const { codeverification } = await request.json();

  console.log("ID reçu:", id);
  console.log("Code reçu:", codeverification);

  if (!codeverification) {
    return NextResponse.json(
      { error: "Code de vérification requis" },
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
      name : true
    },
  });

  if (!utilisateur)
    return NextResponse.json(
      " Le code n'est pas valide et ou l'utilisateur n'existe pas ",
      { status: 400 }
    );

 
  const utilisateursupprimer = await prisma.user.delete({
    where: { id },
  });

  await prisma.session.deleteMany({
    where: { userId: id },
  });


  const emailelement = createElement(SuppressionCompte, {pseudo : utilisateur.name || "pseudo"})

  await sendEmail({
    to : utilisateur.email || "",
    subject : "Suppression du compte.", 
    emailComponent : emailelement
  })

  return NextResponse.json({message : "Le compte de " + utilisateursupprimer.name + " a été définitivement supprimer"});
}
