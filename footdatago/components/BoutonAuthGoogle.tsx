"use client"
import { signIn } from "next-auth/react"
 
export function ConnexionGoogle() {
  return <button onClick={() => signIn("google" , { redirectTo : "/camarche"})}>Connexion-Google</button>
}