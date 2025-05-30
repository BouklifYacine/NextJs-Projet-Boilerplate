import { createAuthClient } from "better-auth/react"
import { emailOTPClient } from "better-auth/client/plugins"

// Utiliser l'URL publique de l'application ou localhost par défaut
const baseURL = typeof window !== 'undefined' 
  ? window.location.origin 
  : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL,
    plugins: [
        emailOTPClient()
    ]

})

export const { signIn, signOut, useSession } = authClient;