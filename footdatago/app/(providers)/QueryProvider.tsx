'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
       
        retry: 2,
        
        retryDelay: 3000, // en millisecondes
       
        staleTime: 10 * 1000, // 10 secondes
        // Durée de cache
      },
      mutations: {
        // Tentatives pour les mutations
        retry: 2,
        // Délai entre les tentatives de mutation
        retryDelay: 3000,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}