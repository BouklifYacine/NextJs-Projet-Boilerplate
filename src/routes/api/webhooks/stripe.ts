import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { createFileRoute } from "@tanstack/react-router";
import { handleCheckoutComplete } from "@/features/abonnement/services/handleCheckoutComplete";
import { handleSubscriptionUpdated } from "@/features/abonnement/services/handleSubscriptionUpdated";
import { handleSubscriptionCanceled } from "@/features/abonnement/services/handleSubscriptionCanceled";

export const Route = createFileRoute("/api/webhooks/stripe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;
        try {
          const body = await request.text();
          const signature = request.headers.get("stripe-signature")!;
          // ... rest of the logic remains the same
          let event: Stripe.Event;
          try {
            event = stripe.webhooks.constructEvent(
              body,
              signature,
              WEBHOOK_SECRET
            );
          } catch (error) {
            console.error("Erreur API:", error);
            return new Response(JSON.stringify({ error: "Webhook Error" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          switch (event.type) {
            case "checkout.session.completed":
              await handleCheckoutComplete(event);
              break;

            case "customer.subscription.updated":
              await handleSubscriptionUpdated(event);
              break;

            case "customer.subscription.deleted":
              await handleSubscriptionCanceled(event);
              break;

            default:
              return new Response(JSON.stringify({ received: true }), {
                headers: { "Content-Type": "application/json" },
              });
          }

          return new Response(JSON.stringify({ received: true }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error(error);
          return new Response(JSON.stringify({ error: "Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
