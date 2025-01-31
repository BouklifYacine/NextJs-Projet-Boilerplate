import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Camarche = async () => {
    const session = await auth()
    console.log(session?.user)
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