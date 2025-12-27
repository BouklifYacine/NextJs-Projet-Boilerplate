---
trigger: always_on
---

---

description: Standards for HTTP requests using the Ky library.
globs: src/features/\*_/services/_.ts, src/lib/api.ts

---

# HTTP Communication Standard (Ky)

All external API communications must use the **Ky** library. Do not use the native `fetch` or `axios`.

## 1. Centralized Instance

- Create a primary instance in `src/lib/api.ts` using `ky.create()` or `ky.extend()`.
- Set a `prefixUrl` and default `timeout` (default: 10000ms).
- Configure global hooks for authentication (adding Bearer tokens) and error logging.

## 2. Request Patterns

- **Type Safety**: Use `.json<T>()` to cast response bodies to specific Zod-inferred types.
- **Methods**: Use explicit methods (`api.get()`, `api.post()`, etc.).
- **Retries**: Leverage Ky's built-in retry logic for idempotent requests (GET, PUT, DELETE) on 5xx errors.

## 3. Error Handling

- Use `HTTPError` from Ky to catch and handle specific status codes (e.g., 401 for unauthorized).
- Implement a custom error wrapper to transform Ky errors into user-friendly business errors.
