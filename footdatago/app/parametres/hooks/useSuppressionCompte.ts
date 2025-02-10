'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { schemaVerificationMotDePasse } from '../schema'
import { verifierMotDePasse } from '../actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export function useSuppressionCompte(userId: string) {
  const [etape, setEtape] = useState<'verification' | 'confirmation'>('verification')
  const router = useRouter()

  const formVerification = useForm({
    resolver: zodResolver(schemaVerificationMotDePasse),
    defaultValues: {
      motdepasse: ''
    }
  })

  const formConfirmation = useForm({
    defaultValues: {
      codeVerification: ''
    }
  })

  const verifierMotDePasseMutation = useMutation({
    mutationFn: async (motdepasse: string) => {
      try {
        const resultat = await verifierMotDePasse(motdepasse)
        if (resultat?.error) throw new Error(resultat.error)
        return resultat
      } catch (error) {
        if ((error as Error).message === "Non autorisé") {
          router.push('/connexion')
          return null
        }
        throw error
      }
    },
    onSuccess: (data) => {
      if (data) {
        toast.success("Code de vérification envoyé")
        setEtape('confirmation')
        formVerification.reset()
      }
    },
    onError: (error: Error) => {
      if (error.message !== "Non autorisé") {
        toast.error(error.message)
        formVerification.setError('motdepasse', { message: error.message })
      }
    }
  })

  const reinitialiser = () => {
    setEtape('verification')
    formVerification.reset()
    formConfirmation.reset()
  }

  return {
    etape,
    formVerification,
    formConfirmation,
    verifierMotDePasseMutation,
    reinitialiser
  }
}