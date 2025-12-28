---
trigger: always_on
---

---

description: Naming Conventions (Files, Components, Functions)
globs: "\*_/_"

---

# Naming Conventions

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

Consistency is key.

## 1. Files & Directories

- **kebab-case**: All file and folder names must be lowercase with dashes.
  - `src/features/user-profile/`
  - `user-card.tsx`
  - `auth-service.ts`
- **Exceptions**: None. Even components are `button.tsx`, not `Button.tsx`.

## 2. Components (Code)

- **PascalCase**: React Components must be PascalCase.
  ```tsx
  export function UserCard() { ... }
  ```
- **Name Match**: The component name should reflect the file name (conceptually).
  - File: `user-list.tsx` -> Component: `UserList`.

## 3. Functions & Variables

- **camelCase**: All variables and functions.
- **Verbs**: Functions should start with a verb indicating action.
  - `getUser()`, `handleSubmit()`, `formatDate()`.
- **Booleans**: usage `is`, `has`, `should`, `can`.
  - `isLoading`, `hasError`, `canSubmit`.

## 4. Types & Interfaces

- **PascalCase**: All types and interfaces.
- **No I-Prefix**: Do NOT use `IUser`, just `User`.
- **Props**: Suffix with `Props`. e.g., `UserCardProps`.

## 5. Constants

- **UPPER_SNAKE_CASE**: For true global constants (env vars, config constants).
- **camelCase**: For configuration objects or derived constants.
