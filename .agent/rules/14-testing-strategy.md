---
description: Hybrid Testing Strategy (Vitest Unit + Browser MCP E2E)
globs: **/*.test.ts, **/*.test.tsx, 	ests/**, itest.config.ts"
---

# Hybrid Testing Strategy

**ALWAYS start by using the sequential-thinking MCP server to analyze the request. User 
sequential-thinking first.**

We use a **Hybrid Strategy** combining high-coverage Unit Tests for logic and Browser-based E2E for critical flows.

## 1. Unit Tests (Vitest) - 90% Coverage Target
- **Scope**:
  - **Server Functions** (/server/*.fn.ts): Critical business logic.
  - **Hooks** (/hooks/*.ts): Complex state logic.
  - **Utils** (/lib/*.ts, /utils/*.ts): Data transformation helpers.
- **Tools**: Use itest. Run un run test (or itest).
- **Mocking**: Mock external services (Prisma, Stripe, Resend) using i.mock().
- **Constraint**: DO NOT unit test simple UI components (buttons, inputs) unless they have complex internal logic.

## 2. E2E Verification (Browser MCP)
- **Scope**: Critical User Journeys (Login, Purchase, Profile Update).
- **Execution**: At the end of a feature, use the rowser MCP to navigate and verify the Happy
Path.
- **Protocol**: see 14-testing-strategy.md (legacy name, now Hybrid).

## 3. Workflow
1. Write Logic -> Write Unit Test -> Verify Green.
2. Build UI -> Verify manually via Browser MCP.
