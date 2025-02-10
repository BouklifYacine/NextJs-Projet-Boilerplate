'use client'

import { useSession } from "next-auth/react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Lock, User, Shield } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

interface SectionProfilProps {
  userId: string
}

export function SectionProfil({ userId }: SectionProfilProps) {
  const { data: session } = useSession()
  
  const { data: userAccounts } = useQuery({
    queryKey: ['userAccounts', userId],
    queryFn: async () => {
      const response = await fetch(`/api/user/accounts?userId=${userId}`)
      if (!response.ok) throw new Error('Echec de la récupération des comptes')
      return response.json()
    }
  })

  const hasProvider = userAccounts?.length > 0

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto space-y-8">
      <div className="flex flex-col items-center text-center gap-6">
        <Avatar className="w-24 h-24 border-2 border-purple-600">
          <AvatarImage 
            src={session?.user?.image ?? ""}
            alt={session?.user?.name ?? "Avatar"}
          />
          <AvatarFallback className="text-2xl">
            {session?.user?.name?.[0]?.toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{session?.user?.name}</h2>
          {hasProvider && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span>Connecté avec {userAccounts[0]?.provider}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-500">
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">Email</span>
          </div>
          <p className="text-sm">{session?.user?.email}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-500">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">Pseudo</span>
          </div>
          <p className="text-sm">{session?.user?.name}</p>
        </div>

        {!hasProvider && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">Mot de passe</span>
            </div>
            <p className="text-sm">••••••••</p>
          </div>
        )}
      </div>
    </Card>
  )
}