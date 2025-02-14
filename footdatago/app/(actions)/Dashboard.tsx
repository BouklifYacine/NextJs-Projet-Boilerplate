import { prisma } from "@/prisma";

export async function GetUtilisateurs (){
    const user = await prisma.user.findMany()
    console.log( user)
    return user
}


