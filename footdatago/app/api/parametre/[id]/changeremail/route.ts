import CodeConfirmation from "@/app/(emails)/CodeConfirmation";
import { sendEmail } from "@/app/utils/email";
import { prisma } from "@/prisma";
import { SchemaChangementMotDePasse } from "@/schema/SchemaParametre";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { createElement } from "react";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import NotifChangementMotDePasse from "@/app/(emails)/NotifChangementMotDePasse";

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

  if (!motdepasse) {
    return NextResponse.json("Vous devez mettre un mot de passe", {
      status: 400,
    });
  }

  const utilisateur = (await prisma.user.findUnique({
    where: { id },
    include: {
      accounts: true,
    },
  })) as (User & { accounts: any[] }) | null;

  if (!utilisateur) {
    return NextResponse.json("Cet utilisateur n'existe pas", { status: 400 });
  }

  if (utilisateur.accounts.length > 0) {
    const provider = utilisateur.accounts[0].provider;
    return NextResponse.json(
      {
        message: `Cette fonctionnalité n'est pas disponible car votre compte est lié à ${provider} . Vous ne pouvez pas changer le mot de passe d'un compte créé avec ${provider}.`,
      },
      { status: 400 }
    );
  }

  const motDePasseValide = await compare(motdepasse, utilisateur.password!);
  if (!motDePasseValide) {
    return NextResponse.json("Le mot de passe n'est pas le bon", {
      status: 400,
    });
  }

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

  if (!utilisateur.email) {
    return NextResponse.json(
      {
        message: "Aucune adresse email associée à ce compte",
      },
      { status: 400 }
    );
  }

  const emailElement = createElement(CodeConfirmation, {
    resetCode,
    pseudo: utilisateur.name || "Utilisateur",
  });

  await sendEmail({
    to: utilisateur.email,
    subject: "Code de réinitialisation changement d'email",
    emailComponent: emailElement,
  });

  return NextResponse.json({
    message:
      "Le code pour changer votre email a été envoyé sur votre adresse email",
  });
}
