"use client"
import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import { ChevronRight } from "lucide-react"
 
export function ConnexionGoogle() {
  return      <Button 
  onClick={() => signIn('google')}
  variant="ghost" 
  className="hover:bg-gray-300 bg-white text-black"
>
  Connexion <ChevronRight />
</Button>
}