import Stripe from "stripe";
import { prisma } from "@/prisma";
import { Plan, PlanAbonnement } from "@/generated/client";
import { createElement } from "react";
import { sendEmail } from "@/emails/email";
import {
  EmailChangementAbonnement,
  EmailSuppressionAbonnement,
} from "@/emails/AbonnementEmail";

export async function handleSubscriptionUpdated(event: Stripe.Event) {
  try {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    if (!subscription.items?.data?.length) {
      console.log("Pas d'items dans l'abonnement");
      return;
    }

    const subscriptionItem = subscription.items.data[0];
    const priceId = subscriptionItem.price.id;

    const user = await prisma.user.findUnique({
      where: { clientId: customerId },
    });

    if (!user) {
      console.log("Utilisateur non trouvé");
      return;
    }

    const isSubscriptionCanceled =
      subscription.cancel_at || subscription.status === "canceled";

    if (isSubscriptionCanceled) {
      const currentPeriodEnd = (
        subscription as Stripe.Subscription & { current_period_end: number }
      ).current_period_end;
      const endDate = new Date(
        (subscription.cancel_at || currentPeriodEnd) * 1000
      );

      await prisma.abonnement.update({
        where: { userId: user.id },
        data: {
          datefin: endDate,
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
      return;
    }

    const isYearly = priceId === process.env.STRIPE_YEARLY_PRICE_ID;
    const periode = isYearly ? PlanAbonnement.annee : PlanAbonnement.mois;

    const endDate = new Date();
    if (isYearly) {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    const isActive = subscription.status === "active";
    const newPlan = isActive ? Plan.pro : Plan.free;
    const oldPlanData = await prisma.abonnement.findUnique({
      where: { userId: user.id },
    });

    if (
      oldPlanData &&
      (oldPlanData.plan !== newPlan || oldPlanData.periode !== periode)
    ) {
      await prisma.abonnement.update({
        where: { userId: user.id },
        data: {
          plan: newPlan,
          periode: periode,
          datefin: endDate,
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: {
          plan: newPlan,
        },
      });

      if (user.email) {
        const emailElement = createElement(EmailChangementAbonnement, {
          name: user.name || user.email,
          plan: isYearly ? "Pro Annuel" : "Pro Mensuel",
          oldPlan:
            oldPlanData.periode === PlanAbonnement.annee
              ? "Pro Annuel"
              : "Pro Mensuel",
        });

        await sendEmail({
          to: user.email,
          subject: "Confirmation du changement de votre abonnement",
          emailComponent: emailElement,
        });
      }
    }
  } catch (error) {
    console.error("Erreur dans handleSubscriptionUpdated:", error);
  }
}
