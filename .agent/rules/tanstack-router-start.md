---
trigger: always_on
---

# TanStack Router & Start Guidelines

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

We use TanStack Router for routing and TanStack Start for server-side logic (Server Functions).

## 1. Routing Strategy

- **File-Based Routing**: Defined in `src/routes`.
- **`createFileRoute`**: ALWAYS use `createFileRoute` for type safety.
  ```tsx
  export const Route = createFileRoute('/dashboard')({
    component: DashboardPage,
    loader: () => ...
  })
  ```
- **Loaders**: Use `loader` for initial data fetching. Loaders run on the server during SSR (mostly), or client on transition.

## 2. Server Functions (RPC)

- **Location**: Define Server Functions in `features/<feature>/server/`.
- **Usage**: Use `createServerFn` to create type-safe backend endpoints that can be called directly from the client.
- **Validation**: MUST use Zod to validate input arguments.
- **Context**: Access headers/cookies via `getWebRequest` or middleware context if needed.

## 3. Navigation

- **Link Component**: Use the `<Link>` component for internal navigation.
- **Type Safety**: The `to` prop is type-checked. Ensure your route path definitions are generated.
- **Navigate Hook**: Use `useNavigate` for programmatic navigation.

## 4. Error Handling

- **Not Found**: Use `notFoundComponent` in route options.
- **Error Component**: Use `errorComponent` to handle loader errors gracefully.
