'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
       
        retry: 2, // Nombre de fois qu'on fait des tentatives de query
        
        retryDelay: 3000, // Délai entre les tentatives de query en millisecondes
       
        staleTime: 50 * 1000, // 10 secondes  Durée de cache
       
      },
      mutations: {
       
        retry: 2,  // Tentatives pour les mutations 
      
        retryDelay: 3000,   // Délai entre les tentatives de mutation
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}