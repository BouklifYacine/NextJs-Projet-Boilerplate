---
description: Testing Strategy (Browser MCP Verification)
globs: "**/*.test.ts", "**/*.test.tsx", "tests/**"
---

# Testing Strategy

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

We verify features by running them in a real browser via the Browser MCP.

## 1. Feature Verification Protocol

**At the end of every feature implementation**, you MUST:

1. **Ask the User**: "Shall I launch the Browser MCP to test this feature?"
2. **Launch & Test**: If the user says YES, use the `browser` MCP tools to:
   - Navigate to the local URL (ensure `bun run dev` is running).
   - Click through the feature (fill forms, click buttons, submit data).
   - Verify the "Happy Path" works as expected.

## 2. Browser MCP Usage

- **Real Environment**: Tests must run against the running local dev server.
- **Simulation**: Act as a real user. Don't just check the DOM; perform the actions.

## 3. Rules

- **No Unit Tests**: We do not write unit tests for individual functions unless specifically requested. We prioritize E2E confidence via the Browser MCP.
