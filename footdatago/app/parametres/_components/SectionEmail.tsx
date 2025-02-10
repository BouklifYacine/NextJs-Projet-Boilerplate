'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from '@/components/ui/alert'
import { changerEmail, verifierMotDePasse } from '../actions'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schemaEmail, schemaVerificationMotDePasse } from '../schema'
import { InputPassword } from './InputPassword'
import toast from 'react-hot-toast'
import { TypeEmail } from '../schema'



export function SectionEmail() {
  const [enEdition, setEnEdition] = useState(false)
  const [etape, setEtape] = useState<'motdepasse' | 'email'>('motdepasse')

  const formMotDePasse = useForm({
    resolver: zodResolver(schemaVerificationMotDePasse),
    defaultValues: {
      motdepasse: ''
    }
  })

  const formEmail = useForm<TypeEmail>({
    resolver: zodResolver(schemaEmail),
    defaultValues: {
      nouvelEmail: '',
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
      setEtape('email')
      formMotDePasse.reset()
    },
    onError: (error: Error) => {
      toast.error(error.message)
      formMotDePasse.setError('motdepasse', { message: error.message })
    }
  })

  const changerEmailMutation = useMutation({
    mutationFn: async (data: TypeEmail) => {
      const resultat = await changerEmail(data)
      if (resultat.error) throw new Error(resultat.error)
      return resultat
    },
    onSuccess: () => {
      toast.success('Email modifié avec succès')
      annuler()
    },
    onError: (error: Error) => {
      toast.error(error.message)
      if (error.message.includes('Code')) {
        formEmail.setError('codeverification', { message: error.message })
      } else {
        formEmail.setError('nouvelEmail', { message: error.message })
      }
    }
  })

  const annuler = () => {
    setEnEdition(false)
    setEtape('motdepasse')
    formMotDePasse.reset()
    formEmail.reset()
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="text-sm text-gray-500">Gérez votre adresse email</p>
          </div>
          {!enEdition && (
            <Button onClick={() => setEnEdition(true)}>
              Modifier
            </Button>
          )}
        </div>

        {enEdition && etape === 'motdepasse' && (
          <form 
            onSubmit={formMotDePasse.handleSubmit((data) => 
              verifierMotDePasseMutation.mutate(data.motdepasse)
            )} 
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="motdepasse">Mot de passe actuel</Label>
              <InputPassword
                id="motdepasse"
                {...formMotDePasse.register('motdepasse')}
              />
              {formMotDePasse.formState.errors.motdepasse && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {formMotDePasse.formState.errors.motdepasse.message}
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

        {enEdition && etape === 'email' && (
          <form 
            onSubmit={formEmail.handleSubmit((data) => 
              changerEmailMutation.mutate(data)
            )}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="nouvelEmail">Nouvel email</Label>
              <Input
                id="nouvelEmail"
                type="email"
                {...formEmail.register('nouvelEmail')}
              />
              {formEmail.formState.errors.nouvelEmail && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {formEmail.formState.errors.nouvelEmail.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="codeVerification">Code de vérification</Label>
              <Input
                id="codeVerification"
                {...formEmail.register('codeverification')}
              />
              {formEmail.formState.errors.codeverification && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {formEmail.formState.errors.codeverification.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="flex space-x-2">
              <Button 
                type="submit"
                disabled={changerEmailMutation.isPending}
              >
                {changerEmailMutation.isPending 
                  ? "Modification en cours..." 
                  : "Changer l'email"
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