"use client"
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Boutondeconnexion = () => {
    const Router = useRouter()
    const Deconnexion = async () => {
        await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                Router.push("/test"); // redirect to login page
              },
            },
          });
    }
  return (
    <div>
        <Button onClick={Deconnexion}>Deconnexion</Button>
    </div>
  )
}

export default Boutondeconnexion