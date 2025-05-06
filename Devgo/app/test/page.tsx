import { auth } from '@/auth'
import BoutonConnexionProviders from '@/components/BoutonConnexionProviders'
import { headers } from 'next/headers'
import React from 'react'

const pageTest = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    console.log(session)
  return (
    <div><BoutonConnexionProviders></BoutonConnexionProviders></div>
  )
}

export default pageTest