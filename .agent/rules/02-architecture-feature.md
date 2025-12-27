---
description: Feature-Based Architecture & Directory Structure
globs: "**/*"
---

# Feature-Based Architecture

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

We strictly follow a Feature-First architecture to maintain scalability and modularity.

## 1. The `features/` Directory

All domain logic and UI must live within `src/features/`.
Do not create loose components in `src/components` unless they are truly generic Design System primitives (buttons, inputs).

## 2. Feature Structure

Each feature folder (e.g., `src/features/auth`) must follow this structure:

```
src/features/<feature-name>/
├── components/      # UI Components specific to this feature
├── hooks/           # Custom React hooks (logic only)
├── server/          # Server Functions (TanStack Start) & Backend Logic
├── services/        # Pure TS business logic (no React dependency)
├── types/           # TS Interfaces/Types
├── schemas/         # Zod schemas (validation)
└── utils/           # Feature-specific helpers
```

## 3. Key Rules

- **Colocation**: Keep things close to where they are used. If a component is only used in "Dashboard", it belongs in `features/dashboard/components`.
- **Public API**: A feature should export its public interface via an `index.ts` (barrel file) if needed, but prefer direct imports to enable tree-shaking unless it's a shared library.
- **No Circular Dependencies**: Feature A should not import from Feature B if Feature B imports from Feature A. Move shared logic to `src/lib` or `src/shared`.

## 4. Generic/Shared Code

- `src/components/ui`: Shadcn/UI primitives only.
- `src/lib`: Generic utilities (dates, formatting, string manipulation).
- `src/db`: Database connection and raw schema.
- `src/hooks`: Truly global hooks (e.g., `use-media-query`, `use-debounce`).
