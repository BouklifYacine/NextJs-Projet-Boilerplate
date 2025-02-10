'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from '@/components/ui/alert'
import { verifierMotDePasse, changerMotDePasse } from '../actions'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schemaVerificationMotDePasse, schemaMotDePasse } from '../schema'
import { InputPassword } from './InputPassword'
import toast from 'react-hot-toast'
import { TypeMotDePasse } from '../schema'



export function SectionMotDePasse() {
  const [enEdition, setEnEdition] = useState(false)
  const [etape, setEtape] = useState<'verification' | 'changement'>('verification')

  const formVerification = useForm({
    resolver: zodResolver(schemaVerificationMotDePasse),
    defaultValues: {
      motdepasse: ''
    }
  })

  const formChangement = useForm<TypeMotDePasse>({
    resolver: zodResolver(schemaMotDePasse),
    defaultValues: {
      motdepasse: '',
      codeverification: ''
    }
  })

  const verifierMotDePasseMutation = useMutation({
    mutationFn: async (motdepasse: string) => {
      const resultat = await verifierMotDePasse(motdepasse)
      if (resultat.error) throw new Error(resultat.error)
      return resultat
    },
    onSuccess: () => {
      toast.success('Code de vérification envoyé par email')
      setEtape('changement')
      formVerification.reset()
    },
    onError: (error: Error) => {
      toast.error(error.message)
      formVerification.setError('motdepasse', { message: error.message })
    }
  })

  const changerMotDePasseMutation = useMutation({
    mutationFn: async (data: TypeMotDePasse) => {
      const resultat = await changerMotDePasse(data)
      if (resultat.error) throw new Error(resultat.error)
      return resultat
    },
    onSuccess: () => {
      toast.success('Mot de passe modifié avec succès')
      annuler()
    },
    onError: (error: Error) => {
      toast.error(error.message)
      if (error.message.includes('Code')) {
        formChangement.setError('codeverification', { message: error.message })
      } else {
        formChangement.setError('motdepasse', { message: error.message })
      }
    }
  })

  const annuler = () => {
    setEnEdition(false)
    setEtape('verification')
    formVerification.reset()
    formChangement.reset()
  }

  if (!enEdition) {
    return (
      <Card className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Mot de passe</h2>
            <p className="text-sm text-gray-500">Modifiez votre mot de passe</p>
          </div>
          <Button onClick={() => setEnEdition(true)}>
            Modifier
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {etape === 'verification' && (
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
            <div className="flex space-x-2">
              <Button 
                type="submit" 
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

        {etape === 'changement' && (
          <form 
            onSubmit={formChangement.handleSubmit((data) => 
              changerMotDePasseMutation.mutate(data)
            )}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="motdepasse">Nouveau mot de passe</Label>
              <InputPassword
                id="motdepasse"
                {...formChangement.register('motdepasse')}
              />
              {formChangement.formState.errors.motdepasse && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {formChangement.formState.errors.motdepasse.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="codeverification">Code de vérification</Label>
              <Input
                id="codeverification"
                {...formChangement.register('codeverification')}
                placeholder="Entrez le code reçu par email"
              />
              {formChangement.formState.errors.codeverification && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {formChangement.formState.errors.codeverification.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="flex space-x-2">
              <Button 
                type="submit"
                disabled={changerMotDePasseMutation.isPending}
              >
                {changerMotDePasseMutation.isPending 
                  ? "Modification en cours..." 
                  : "Changer le mot de passe"
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
      </div>
    </Card>
  )
}