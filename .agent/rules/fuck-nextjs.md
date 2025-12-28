---
trigger: always_on
---

---

description: Strict prohibition of Next.js-specific directives and features.
globs: \*_/_.{ts,tsx}

---

# Framework Purity: TanStack Start vs Next.js

This project uses **TanStack Start**. You must never use Next.js-specific directives or APIs.

## 1. Forbidden Directives

- **NEVER** use `"use client"` or `"use server"` at the top of files.
- TanStack Start handles the client/server boundary through `createServerFn` and file-based routing logic.

## 2. Forbidden Components & APIs

- **No `next/link`**: Use `@tanstack/react-router`'s `<Link>` component.
- **No `next/image`**: Use standard `<img>` tags or a custom optimized Image component.
- **No `next/navigation`**: Use TanStack's `useNavigate` or `useRouter` hooks.

## 3. Server Functions

- All server-side logic must be encapsulated within `createServerFn`.
- Ensure server-side logic is located in `.server.ts` files or within the `services/` directory of a feature.
