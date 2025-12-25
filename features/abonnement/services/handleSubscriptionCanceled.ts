import Stripe from "stripe";
import { prisma } from "@/prisma";
import { Plan } from "@/generated/client";
import { createElement } from "react";
import { sendEmail } from "@/emails/email";
import { EmailSuppressionAbonnement } from "@/emails/AbonnementEmail";

export async function handleSubscriptionCanceled(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;
  const customerId = subscription.customer as string;

  const user = await prisma.user.findUnique({
    where: { clientId: customerId },
  });

  if (!user) {
    throw new Error("Utilisateur non trouvé pour le customerId: " + customerId);
  }

  await prisma.abonnement.delete({
    where: { userId: user.id },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      plan: Plan.free,
      clientId: null,
    },
  });

  if (user.email) {
    const emailElement = createElement(EmailSuppressionAbonnement, {
      name: user.name || user.email,
      plan: "Pro",
    });

    await sendEmail({
      to: user.email,
      subject: "Confirmation de résiliation de votre abonnement",
      emailComponent: emailElement,
    });
  }
}
