import React from 'react'
import ComponentPage from './components/componentspage'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/prisma'

const DashboardServer = async () => {
  const session = await auth()
  if(!session?.user?.id) redirect("/")

    const utilisateur = await prisma.user.findUnique({
      where: {id :session?.user?.id }
    })

   if(utilisateur?.role !== "Admin") redirect("/")
  
  return (
    <>
    <ComponentPage></ComponentPage>
    </>
  )
}

export default DashboardServer