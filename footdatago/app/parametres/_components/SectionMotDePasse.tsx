'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMotDePasse } from '../hooks/useMotDePasse'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { changerMotDePasse } from '../actions'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { InputPassword } from './InputPassword'

interface SectionMotDePasseProps {
  userId: string;
}

export function SectionMotDePasse({ userId }: SectionMotDePasseProps) {
  const [enEdition, setEnEdition] = useState(false)
  const {
    etape,
    formVerification,
    formChangement,
    verifierMotDePasseMutation,
    reinitialiser
  } = useMotDePasse(userId)

  const changerMotDePasseMutation = useMutation({
    mutationFn: async (data: { motdepasse: string, codeverification: string }) => {
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
    }
  })

  const annuler = () => {
    setEnEdition(false)
    reinitialiser()
  }

  const gererChangementMotDePasse = async (data: { motdepasse: string, codeverification: string }) => {
    try {
      await changerMotDePasseMutation.mutateAsync(data)
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Mot de passe</h2>
            <p className="text-sm text-gray-500">Modifiez votre mot de passe</p>
          </div>
          {!enEdition && (
            <Button onClick={() => setEnEdition(true)}>
              Modifier
            </Button>
          )}
        </div>

        {enEdition && etape === 'verification' && (
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
                    {formVerification.formState.errors.motdepasse.message?.toString()}
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

        {enEdition && etape === 'changement' && (
          <form 
            onSubmit={formChangement.handleSubmit(gererChangementMotDePasse)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="nouveauMotDePasse">Nouveau mot de passe</Label>
              <InputPassword
                id="motdepasse"
                {...formVerification.register('motdepasse')}
              />
              {formChangement.formState.errors.motdepasse && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {formChangement.formState.errors.motdepasse.message?.toString()}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="codeVerification">Code de vérification</Label>
              <Input
                id="codeVerification"
                {...formChangement.register('codeverification')}
              />
              {formChangement.formState.errors.codeverification && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {formChangement.formState.errors.codeverification.message?.toString()}
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