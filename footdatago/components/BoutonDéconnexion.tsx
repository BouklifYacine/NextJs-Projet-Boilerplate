"use client"
import { signOut } from "next-auth/react"
 
export function Deconnexion() {
  return <button onClick={() => signOut()}>Déconnexion</button>
}