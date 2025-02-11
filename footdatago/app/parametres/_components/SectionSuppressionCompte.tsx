'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from '@/components/ui/alert'
import { supprimerCompte, verifierMotDePasse } from '../actions'
import { useMutation, useQuery } from '@tanstack/react-query'
import { InputPassword } from './InputPassword'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schemaVerificationMotDePasse } from '../schema'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { signOut } from "next-auth/react"

export function SectionSuppression({ userId }: { userId: string }) {
  const router = useRouter()
  const [confirmation, setConfirmation] = useState(false)
  const [etape, setEtape] = useState<'verification' | 'confirmation'>('verification')

  // Récupérer les informations du compte
  const { data: userAccounts, isLoading } = useQuery({
    queryKey: ['userAccounts', userId],
    queryFn: async () => {
      const response = await fetch(`/api/user/accounts?userId=${userId}`)
      if (!response.ok) throw new Error('Échec de la récupération des comptes')
      return response.json()
    }
  })

  const hasProvider = userAccounts?.length > 0

  const formVerification = useForm({
    resolver: zodResolver(schemaVerificationMotDePasse),
    defaultValues: { motdepasse: '' }
  })

  const formConfirmation = useForm({
    defaultValues: {
      codeVerification: ''
    }
  })

  const verifierMotDePasseMutation = useMutation({
    mutationFn: async (motdepasse: string) => {
      const resultat = await verifierMotDePasse(motdepasse)
      if (resultat.error) throw new Error(resultat.error)
      return resultat
    },
    onSuccess: () => {
      if (!hasProvider) {
        toast.success('Code de vérification envoyé par email')
      }
      setEtape('confirmation')
      formVerification.reset()
    },
    onError: (error: Error) => {
      toast.error(error.message)
      formVerification.setError('motdepasse', { message: error.message })
    }
  })

  const supprimerCompteMutation = useMutation({
    mutationFn: async (codeVerification?: string) => {
      try {
        const resultat = await supprimerCompte(codeVerification)
        if (resultat?.error) throw new Error(resultat.error)
        return resultat
      } catch (error) {
        throw error
      }
    },
    onSuccess:  () => {
      toast.success('Compte supprimé avec succès')
       signOut({ redirectTo: "/connexion" })
  
      // Redirection manuelle
      router.push("/connexion")
      router.refresh() 
    },
    onError: (error: Error) => {
      toast.error(error.message || "Une erreur est survenue")
    }
})

  const annuler = () => {
    setConfirmation(false)
    setEtape('verification')
    formVerification.reset()
    formConfirmation.reset()
  }

  const handleSuppression = async () => {
    if (hasProvider) {
      // Pour les comptes provider, supprimer directement
      await supprimerCompteMutation.mutateAsync(undefined)
    } else {
      // Pour les comptes avec email/mot de passe, vérifier le code
      const data = formConfirmation.getValues()
      await supprimerCompteMutation.mutateAsync(data.codeVerification)
    }
  }

  if (isLoading) {
    return (
      <Card className="p-6 border-destructive">
        <div>Chargement...</div>
      </Card>
    )
  }

  return (
    <Card className="p-6 border-destructive">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-destructive">Supprimer le compte</h2>
          <p className="text-sm text-gray-500">
            Cette action est irréversible. Toutes vos données seront définitivement supprimées.
          </p>
        </div>

        {!confirmation ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Supprimer mon compte</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est définitive et irréversible. Toutes vos données seront 
                  supprimées de nos serveurs.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => {
                    setConfirmation(true)
                    if (hasProvider) {
                      setEtape('confirmation')
                    }
                  }}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Continuer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <div className="space-y-4">
            {!hasProvider && etape === 'verification' && (
              <form 
                onSubmit={formVerification.handleSubmit((data) => 
                  verifierMotDePasseMutation.mutate(data.motdepasse)
                )} 
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="motdepasse">Mot de passe actuel</Label>
                  <InputPassword
                    id="motdepasse"
                    {...formVerification.register('motdepasse')}
                  />
                  {formVerification.formState.errors.motdepasse && (
                    <Alert variant="destructive">
                      <AlertDescription>
                        {formVerification.formState.errors.motdepasse.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    variant="destructive"
                    disabled={verifierMotDePasseMutation.isPending}
                  >
                    {verifierMotDePasseMutation.isPending 
                      ? "Vérification..." 
                      : "Continuer"
                    }
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={annuler}
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            )}

            {etape === 'confirmation' && (
              <div className="space-y-4">
                {!hasProvider ? (
                  <form onSubmit={formConfirmation.handleSubmit(() => handleSuppression())} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="codeVerification">Code de vérification</Label>
                      <Input
                        id="codeVerification"
                        {...formConfirmation.register('codeVerification')}
                        placeholder="Entrez le code reçu par email"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        type="submit"
                        variant="destructive"
                        disabled={supprimerCompteMutation.isPending}
                      >
                        {supprimerCompteMutation.isPending 
                          ? "Suppression en cours..." 
                          : "Confirmer la suppression"
                        }
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={annuler}
                      >
                        Annuler
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      variant="destructive"
                      disabled={supprimerCompteMutation.isPending}
                      onClick={() => handleSuppression()}
                    >
                      {supprimerCompteMutation.isPending 
                        ? "Suppression en cours..." 
                        : "Confirmer la suppression"
                      }
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={annuler}
                    >
                      Annuler
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}