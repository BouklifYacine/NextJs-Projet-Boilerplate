'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from '@/components/ui/alert'
import { changerPseudo, verifierMotDePasse } from '../actions'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schemaPseudo, schemaVerificationMotDePasse } from '../schema'
import { InputPassword } from './InputPassword'
import toast from 'react-hot-toast'

export function SectionPseudo({ userId }: { userId: string }) {
  const [enEdition, setEnEdition] = useState(false)
  const [etape, setEtape] = useState<'verification' | 'changement'>('verification')

  const { data: userAccounts } = useQuery({
    queryKey: ['userAccounts', userId],
    queryFn: async () => {
      const response = await fetch(`/api/user/accounts?userId=${userId}`)
      if (!response.ok) throw new Error('Failed to fetch user accounts')
      return response.json()
    }
  })

  const hasProvider = userAccounts?.length > 0

  const formVerification = useForm({
    resolver: zodResolver(schemaVerificationMotDePasse)
  })

  const formPseudo = useForm({
    resolver: zodResolver(schemaPseudo)
  })

  const verifierMotDePasseMutation = useMutation({
    mutationFn: verifierMotDePasse,
    onSuccess: () => setEtape('changement'),
    onError: (error: Error) => toast.error(error.message)
  })

  const changerPseudoMutation = useMutation({
    mutationFn: changerPseudo,
    onSuccess: () => {
      toast.success('Pseudo modifié avec succès')
      annuler()
    },
    onError: (error: Error) => toast.error(error.message)
  })

  const annuler = () => {
    setEnEdition(false)
    setEtape('verification')
    formVerification.reset()
    formPseudo.reset()
  }

  if (!enEdition) {
    return (
      <Card className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Pseudo</h2>
            <p className="text-sm text-gray-500">Changez votre pseudo</p>
          </div>
          <Button onClick={() => setEnEdition(true)}>Modifier</Button>
        </div>
      </Card>
    )
  }

  if (!hasProvider && etape === 'verification') {
    return (
      <Card className="p-6">
        <form onSubmit={formVerification.handleSubmit(data => verifierMotDePasseMutation.mutate(data.motdepasse))}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Mot de passe actuel</Label>
              <InputPassword {...formVerification.register('motdepasse')} />
              {formVerification.formState.errors.motdepasse && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {formVerification.formState.errors.motdepasse.message as string}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="submit">Continuer</Button>
              <Button type="button" variant="outline" onClick={annuler}>Annuler</Button>
            </div>
          </div>
        </form>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <form onSubmit={formPseudo.handleSubmit(data => changerPseudoMutation.mutate(data))}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nouveau pseudo</Label>
            <Input {...formPseudo.register('pseudo')} />
            {formPseudo.formState.errors.pseudo && (
              <Alert variant="destructive">
                <AlertDescription>
                  {formPseudo.formState.errors.pseudo.message as string}
                </AlertDescription>
              </Alert>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="submit">Changer le pseudo</Button>
            <Button type="button" variant="outline" onClick={annuler}>Annuler</Button>
          </div>
        </div>
      </form>
    </Card>
  )
}