'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { schemaVerificationMotDePasse, schemaEmail } from '../schema'
import { verifierMotDePasse, changerEmail } from '../actions'
import { TypeEmail } from '../schema'

export function useEmail(userId: string) {
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
      codeVerification: ''
    }
  })

  // Mutation pour la vérification du mot de passe
  const verifierMotDePasseMutation = useMutation({
    mutationFn: async (motdepasse: string) => {
      const resultat = await verifierMotDePasse(motdepasse)
      if (resultat.error) throw new Error(resultat.error)
      return resultat
    },
    onSuccess: () => {
      setEtape('email')
      formMotDePasse.reset()
    }
  })

  // Mutation pour le changement d'email
  const changerEmailMutation = useMutation({
    mutationFn: async (donnees: TypeEmail) => {
      const resultat = await changerEmail(donnees)
      if (resultat.error) throw new Error(resultat.error)
      return resultat
    },
    onSuccess: () => {
      formEmail.reset()
      setEtape('motdepasse')
    }
  })

  const reinitialiser = () => {
    setEtape('motdepasse')
    formMotDePasse.reset()
    formEmail.reset()
  }

  return {
    etape,
    formMotDePasse,
    formEmail,
    verifierMotDePasseMutation,
    changerEmailMutation,
    reinitialiser
  }
}