"use client";

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Session } from "next-auth"
import { useRouter } from "next/navigation";

type Abonnement = {
  nom: string
  prix: string
  description: string
  avantages: string[]
  lienStripe: string | null
}

interface ClientSidePaymentProps {
  session: Session | null
  abonnements: Abonnement[]
}

const ClientSidePayment = ({ session, abonnements }: ClientSidePaymentProps) => {
  const router =  useRouter()
  const [abonnementChoisi, setAbonnementChoisi] = useState("Mensuel")

  console.log("Utilisateur:", session?.user)

  const gererAchat = (lienStripe: string | null) => {
    if (!session) {
   
      router.push('/connexion')
      return
    }

    if (lienStripe) {
        router.push(lienStripe)
    }
  }

  return (
    <RadioGroup
      value={abonnementChoisi}
      onValueChange={setAbonnementChoisi}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {abonnements.map((abonnement) => (
        <Card
          key={abonnement.nom}
          className={`bg-gray-900 border-2 ${
            abonnementChoisi === abonnement.nom ? "border-purple-500" : "border-gray-700"
          }`}
        >
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              {abonnement.nom}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {abonnement.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-white">
            <div className="text-4xl font-bold mb-4">
              {abonnement.prix}
              <span className="text-lg font-normal">
                {abonnement.nom !== "Annuel" ? "/mois" : "/an"}
              </span>
            </div>
            <RadioGroupItem
              value={abonnement.nom}
              id={abonnement.nom}
              className="sr-only"
            />
            <ul className="space-y-2">
              {abonnement.avantages.map((avantage, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-purple-500 mr-2" />
                  {avantage}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant={abonnementChoisi === abonnement.nom ? "default" : "outline"}
              className="w-full"
              onClick={() => {
                setAbonnementChoisi(abonnement.nom)
                gererAchat(abonnement.lienStripe)
              }}
            >
              {!session 
                ? "S'abonner" 
                : abonnement.lienStripe 
                  ? "S'abonner" 
                  : "Commencer gratuitement"
              }
            </Button>
          </CardFooter>
        </Card>
      ))}
    </RadioGroup>
  )
}

export default ClientSidePayment