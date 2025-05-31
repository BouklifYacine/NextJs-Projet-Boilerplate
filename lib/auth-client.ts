import { createAuthClient } from "better-auth/react"
import { emailOTPClient } from "better-auth/client/plugins"

// Afficher l'URL utilisée pour le débogage
const baseURLValue = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
console.log("Auth Client - URL utilisée:", baseURLValue);
console.log("NEXT_PUBLIC_APP_URL:", process.env.NEXT_PUBLIC_APP_URL);
console.log("window.location.origin:", window.location.origin); // Affiche l'URL de base actuelle
export const authClient = createAuthClient({
    /** The base URL of the server (uses environment variable or falls back to same domain) */
    baseURL: baseURLValue,
    plugins: [
        emailOTPClient()
    ]

})

export const { signIn, signOut, useSession } = authClient;