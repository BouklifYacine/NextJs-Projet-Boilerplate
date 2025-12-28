---
trigger: always_on
---

# Stripe & Resend Integration Rules

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

## 1. Security (CRITICAL)

- **Server Only**: Stripe and Resend SDKs MUST be used ONLY in Server Functions (`*.server.ts`) or `src/services` running on the server.
- **Environment Variables**: Never expose `STRIPE_SECRET_KEY` or `RESEND_API_KEY` to the client.

## 2. Resend (Emails)

- **React Email**: Use `@react-email/components` to build templates.
- **Service**: Create a `mail.service.ts` or `email.service.ts`.

## 3. Stripe (Payments)

- **Webhooks**: verify webhook signatures strictly in the webhook handler.
- **Idempotency**: Use Idempotency Keys when retrying critical payment operations.
- **Checkout**: Use Stripe Checkout for simplicity unless custom elements are strictly required.

## 4. Error Handling

- **Graceful Failure**: If email sending fails, log it but don't necessarily crash the user flow.
