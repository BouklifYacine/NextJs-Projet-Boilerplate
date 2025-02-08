"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const abonnements = [
  {
    nom: "Gratuit",
    prix: "0€",
    description: "Pour commencer",
    avantages: ["Fonctionnalités de base", "Support par email"],
    lienStripe: null,
  },
  {
    nom: "Mensuel",
    prix: "5€",
    description: "Pour les utilisateurs réguliers",
    avantages: ["Toutes les fonctionnalités gratuites", "Support prioritaire", "Fonctionnalités avancées"],
    lienStripe: "https://buy.stripe.com/test_7sIbIVcioe2WfLO6op",
  },
  {
    nom: "Annuel",
    prix: "50€",
    description: "Pour les utilisateurs engagés",
    avantages: [
      "Toutes les fonctionnalités mensuelles",
      "Support 24/7",
      "Accès anticipé aux nouvelles fonctionnalités",
    ],
    lienStripe: process.env.NEXT_PUBLIC_STRIPE_LINK_YEARLY_PRICE_ID
  },
]

const SectionPayement = () => {
  const [abonnementChoisi, setAbonnementChoisi] = useState("Gratuit")

  const gererAchat = (lienStripe: string | null) => {
    if (lienStripe) {
      window.location.href = lienStripe
    }
  }

  return (
    <div className="bg-black  p-20">
      <div className="container mx-auto px-4 m-20">
        <h2 className="text-white text-center mb-12 text-3xl md:text-5xl font-bold tracking-tight">
          Passer au Next Level
        </h2>
        <RadioGroup
          value={abonnementChoisi}
          onValueChange={setAbonnementChoisi}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {abonnements.map((abonnement) => (
            <Card
              key={abonnement.nom}
              className={`bg-gray-900 border-2 ${abonnementChoisi === abonnement.nom ? "border-purple-500" : "border-gray-700"}`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">{abonnement.nom}</CardTitle>
                <CardDescription className="text-gray-400">{abonnement.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-white">
                <div className="text-4xl font-bold mb-4">
                  {abonnement.prix}
                  <span className="text-lg font-normal">{abonnement.nom !== "Annuel" ? "/mois" : "/an"}</span>
                </div>
                <RadioGroupItem value={abonnement.nom} id={abonnement.nom} className="sr-only" />
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
                  {abonnement.lienStripe ? "S'abonner" : "Commencer gratuitement"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default SectionPayement

