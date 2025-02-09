import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma"

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!
    
    // Vérifie la signature du webhook
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET)
    } catch (error) {
      return NextResponse.json({ error: "Webhook Error" }, { status: 400 })
    }

    // Si ce n'est pas un événement checkout, on l'ignore gentiment
    if (event.type !== "checkout.session.completed") {
      return NextResponse.json({ received: true })
    }

    // Récupère la session avec les détails
    const session = await stripe.checkout.sessions.retrieve(
      (event.data.object as Stripe.Checkout.Session).id,
      { expand: ["line_items"] }
    )

    // Vérifie et trouve l'utilisateur
    const email = session.customer_details?.email
    if (!email) return NextResponse.json({ error: "No email" }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ error: "No user" }, { status: 404 })

    // Met à jour le clientId si nécessaire
    const clientId = typeof session.customer === 'string' ? session.customer : session.customer?.id
    if (!user.clientId && clientId) {
      await prisma.user.update({
        where: { id: user.id },
        data: { clientId }
      })
    }

    // Traite l'abonnement
    const item = session.line_items?.data[0]
    if (item?.price?.type === "recurring") {
      const endDate = new Date()
      const isYearly = item.price.id === process.env.STRIPE_YEARLY_PRICE_ID

      if (isYearly) {
        endDate.setFullYear(endDate.getFullYear() + 1)
      } else {
        endDate.setMonth(endDate.getMonth() + 1)
      }
      // Met à jour ou crée l'abonnement
      await prisma.abonnement.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          datedebut: new Date(),
          datefin: endDate,
          plan: "pro",
          periode: isYearly ? "année" : "mois"
        },
        update: {
          plan: "pro",
          periode: isYearly ? "année" : "mois",
          datedebut: new Date(),
          datefin: endDate,
        }
      })

      // Met à jour le plan utilisateur
      await prisma.user.update({
        where: { id: user.id },
        data: { plan: "pro" }
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server Error" }, { status: 500 })
  }
}