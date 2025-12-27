---
trigger: always_on
---

# Task Implementation Protocol

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

When generating code for a task:

## 1. Analysis First

- **Read Context**: Always read the related files (`viewport`) before proposing a change.
- **Understanding**: Restate the goal if ambiguous.

## 2. Atomic Changes

- **Step-by-Step**: Don't try to refactor the whole app in one prompt.
- **One Component at a Time**: Create the component, then the hook, then the export.

## 3. Verification

- **Lint Check**: Ensure no unused imports or variables.
- **Type Check**: Verify that interfaces match the implementation.
- **Build**: Suggest running `bun run build` or `bun run dev` to verify.

## 4. No Hallucinations

- **Existing Libraries**: Only import libraries that are in `package.json`. If a new one is needed, ask the user to install it first: `bun add <lib>`.
- **Imports**: Verify import paths (use `@/` alias provided by `tsconfig.json`).
