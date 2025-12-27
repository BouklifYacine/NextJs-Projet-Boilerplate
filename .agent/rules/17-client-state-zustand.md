---
description: State Management Strategy (Zustand & URL)
globs: "src/store/**/*.ts", "src/hooks/**/*.ts"
---

# State Management Rules

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

We distinguish strictly between Server State, URL State, and Global UI State.

## 1. Hierarchy of State

1.  **URL State (High Priority)**: If it can be in the URL (filters, search, pagination), it MUST go in the URL via TanStack Router (`searchParams`).
2.  **Server State**: Data fetched from API. MUST use TanStack Query.
3.  **Local State**: `useState` / `useReducer` for component-isolated interactions.
4.  **Global UI State**: `Zustand`. Only for UI state that persists user sessions or spans many disconnected components (e.g., Sidebar Open/Close, Auth Session Token, Theme).

## 2. Zustand Patterns

- **Atomic Stores**: Create small, focused stores (e.g., `useSidebarStore`, `usePlayerStore`) rather than one giant `useAppStore`.
- **Selectors**: Always select only what you need to prevent re-renders.
  ```tsx
  // BAD
  const { isOpen } = useSidebarStore();
  // GOOD
  const isOpen = useSidebarStore((state) => state.isOpen);
  ```
- **Actions**: Define actions inside the store, not outside.

## 3. Persistence

- **Middleware**: Use `persist` middleware only for user preferences (Theme, Sidebar State). Never persist sensitive data locally without purpose.
