import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { prisma } from "@/prisma";
import { Plan, PlanAbonnement } from "@/generated/client";
import { createElement } from "react";
import { sendEmail } from "@/emails/email";
import { EmailNouvelAbonnement } from "@/emails/AbonnementEmail";

export async function handleCheckoutComplete(event: Stripe.Event) {
  const session = await stripe.checkout.sessions.retrieve(
    (event.data.object as Stripe.Checkout.Session).id,
    { expand: ["line_items"] }
  );

  const email = session.customer_details?.email;
  if (!email) throw new Error("Pas d'email");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Pas d'utilisateur");

  const clientId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id;

  if (!user.clientId && clientId) {
    await prisma.user.update({
      where: { id: user.id },
      data: { clientId },
    });
  }

  const item = session.line_items?.data[0];
  if (item?.price?.type === "recurring") {
    const endDate = new Date();
    const isYearly = item.price.id === process.env.STRIPE_YEARLY_PRICE_ID;
    const periode = isYearly ? PlanAbonnement.annee : PlanAbonnement.mois;

    if (isYearly) {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    await prisma.abonnement.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        datedebut: new Date(),
        datefin: endDate,
        plan: Plan.pro,
        periode: periode,
      },
      update: {
        plan: Plan.pro,
        periode: periode,
        datedebut: new Date(),
        datefin: endDate,
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { plan: Plan.pro },
    });

    const emailElement = createElement(EmailNouvelAbonnement, {
      name: user.name || email,
      plan: isYearly ? "Pro Annuel" : "Pro Mensuel",
    });

    await sendEmail({
      to: email,
      subject: "Confirmation de votre abonnement",
      emailComponent: emailElement,
    });
  }
}
