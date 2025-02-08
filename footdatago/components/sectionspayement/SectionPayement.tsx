// components/SectionPayement/index.tsx
import { auth } from '@/auth'
import ClientSidePayment from './ClientPayement'

const abonnements = [
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
    lienStripe: process.env.NEXT_PUBLIC_STRIPE_LINK_YEARLY_PRICE_ID || ""
  },
]

const SectionPayement = async () => {
  const session = await auth()

  return (
    <div className="bg-black p-20">
      <div className="container mx-auto px-4 m-20">
        <h2 className="text-white text-center mb-12 text-3xl md:text-5xl font-bold tracking-tight">
          Passer au Next Level
        </h2>
        <ClientSidePayment session={session} abonnements={abonnements} />
      </div>
    </div>
  )
}

export default SectionPayement