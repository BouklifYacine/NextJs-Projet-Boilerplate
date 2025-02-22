import { auth } from "@/auth"
import { prisma } from "@/prisma"


export async function AdminMiddlewareServeur(){
    const session = await auth()
    const sessionID = session?.user?.id

    if(!sessionID) throw new Error('Accès non autorisé')

    const utilisateur = await prisma.user.findUnique({
        where: {id: sessionID}
    })
    if(utilisateur?.role !== "Admin") throw new Error('Accès non autorisé non admin ')
    
}