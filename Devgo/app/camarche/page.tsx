import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Camarche = async () => {
    const session = await auth()
    console.log("voici l'id : " +  session?.user?.id)
    console.log("Voici la session au complet : " + session?.user?.name + session?.user?.email + session?.user?.image)
    if(!session) {
        redirect("/")
    }
  return (
    <div>
        <p>Ca marche</p>
        <p>{session?.user?.name}</p>
    </div>
  )
}

export default Camarche