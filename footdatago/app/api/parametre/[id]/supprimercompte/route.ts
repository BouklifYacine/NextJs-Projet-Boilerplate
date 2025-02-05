import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";

interface Props {
  params: {
    idUtilisateur: string;
  };
}

// Enlever les id quand on a fini de faire les test et remplacer par session ca sera plus simple comme cela
// Enlever donc le dossier [id] et donc tout mettre dans le dossier paramètre 

export async function POST(request: NextRequest, { params }: Props) {
  const { idUtilisateur } = await params;
  const { motdepasse } = await request.json();

  if (!motdepasse) return NextResponse.json("le mot de passe n'existe pas " , {status : 400})

  const utilisateur = await prisma.user.findUnique({
    where: { id: idUtilisateur },
   
  });

  if (!utilisateur || !(await compare(motdepasse, utilisateur.password!))) 
    return NextResponse.json("Cet utilisateur n'existe pas ou le mot de passe n'est pas le bon");

  return NextResponse.json(utilisateur.name);
}
