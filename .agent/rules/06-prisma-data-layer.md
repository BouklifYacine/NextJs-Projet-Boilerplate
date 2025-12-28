---
trigger: always_on
description: Prisma ORM & Database Access
globs: "src/db/*.ts", "src/**/*.service.ts", "prisma/schema.prisma"
---

# Prisma ORM & Data Layer

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

These rules ensure database performance, safety, and consistency.

## 1. Client Management

- **Singleton**: Use the singleton instance from `src/lib/prisma.ts` (or `src/db`).
- **No Global Instantiation**: Never create `new PrismaClient()` inside a function or component.

## 2. Schema Design

- **Snake_case DB, CamelCase JS**: use `@map` and `@@map` to keep database columns `snake_case` but TypeScript fields `camelCase`.
- **Indexes**: Always index foreign keys and frequently queried fields.

## 3. Querying

- **Select Specific Fields**: Avoid `findMany()` without `select`. Only fetch what you need to prevent over-fetching.
- **Transactions**: Use `$transaction` for multiple write operations.

## 4. Migrations

- **Dev Flow**: Use `bunx prisma migrate dev` locally (or via MCP).
- **No Manual SQL**: Avoid manual schema changes; let Prisma manage the history.
