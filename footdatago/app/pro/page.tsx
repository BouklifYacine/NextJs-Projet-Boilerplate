import { auth } from '@/auth'
import { prisma } from '@/prisma'
import { redirect } from 'next/navigation'
import React from 'react'
// Page pour tester si l'utilisateur a bien un abonnement 
const ProPage = async () => {
    const session = await auth()
  

        const sessiondetails = session?.user?.name 
        // const sessionId = session?.user?.id
      const sessiond = JSON.stringify(sessiondetails)

      const utilisateur = await prisma.user.findUnique({
        where : {id : session?.user?.id}
      })

      const utilisateurtypeabonnement = await prisma.abonnement.findFirst({
        where : {plan : utilisateur?.plan }
      })

      if(utilisateur?.plan === "free") return redirect('/')

        
  return (
    <div>  {sessiond && <p>Vous etes connecté </p> }
    {utilisateur?.plan === "pro" && <p>Vous etes abonné a notre offre </p>}
    <p>{sessiondetails}</p>
    <p>Vous avez l'abonnement : {utilisateurtypeabonnement?.plan}</p>
    
    </div>
  )
}

export default ProPage