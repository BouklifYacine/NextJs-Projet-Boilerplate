---
description: Better Auth Implementation
globs: "src/lib/auth-client.ts", "auth.ts", "src/routes/**/*"
---

# Better Auth Rules

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

We use **Better Auth** for authentication.

## 1. Client Side

- **authClientHook**: Use the generated `authClient` hook (from `src/lib/auth-client.ts`) for client-side interactions.
  ```tsx
  const { data: session } = authClient.useSession();
  const { signIn, signUp } = authClient;
  ```
- **Optimistic UI**: Use `isPending` states provided by the hooks.

## 2. Route Protection

- **beforeLoad**: Protect routes in `src/routes/...` using TanStack Router's `beforeLoad`.
  ```tsx
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  };
  ```
- **Context**: Pass the auth session into the Router Context in `__root.tsx` or main provider so it's available everywhere.

## 3. Server Functions

- **Get Session**: On the server (Server Functions), retrieve the session using the server-side auth helper.
- **Authorization**: Always check if the user is authorized to perform the action (RBAC). `if (user.role !== 'ADMIN') throw new Error('Unauthorized')`.
