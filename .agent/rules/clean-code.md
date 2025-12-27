---
trigger: always_on
---

# TypeScript Clean Code & Core Principles

**ALWAYS start by using the `sequential-thinking` MCP server to analyze the request. User "sequential-thinking" first.**

You are a senior TypeScript developer. Your code must be type-safe, readable, and maintainable.

## 1. Strong Typing & Safety

- **Strict Mode**: Always assume `drict: true` is on.
- **No `any`**: Never use `any`. Use `unknown` if the type isn't confirmed yet, then narrow it.
- **Zod for Validation**: All external data (API responses, URL params, Forms) MUST be validated with Zod schemas.
- **Return Types**: Explicitly define return types for all public functions and components.

## 2. Immutability & const

- **Prefer `const`**: Use `const` variables over `let` whenever possible.
- **Readonly**: Use `readonly` for array and object properties when they shouldn't be mutated.
  ```typescript
  const list: readonly string[] = ["a", "b"];
  ```
- **As Const**: Use `as const` for literal values and enums.

## 3. Function & Implementation

- **Early Returns**: Use early returns to reduce indentation nesting (guard clauses).
- **Pure Functions**: Prefer pure functions (output depends only on input, no side effects) for business logic.
- **Single Responsibility**: Each function should do one thing well.
- **Async/Await**: Always use `async/await` over raw `.then()` chains, except in specific edge cases (e.g., observable streams).

## 4. SOLID Implementation

- **S - Single Responsibility**: Components/Functions must have one reason to change.
- **O - Open/Closed**: Extend functionality via composition/props, don't modify the core.
- **L - Liskov Substitution**: (Focus on interfaces) Subtypes must be substitutable.
- **I - Interface Segregation**: Small, focused interfaces > One giant interface.
- **D - Dependency Inversion**: Depend on abstractions (hooks/props), not concrete implementations used inside components.

## 5. Comments & Documentation

- **Why, not What**: Comments should explain _why_ something is done, not what the code does (the code should be self-documenting).
- **JSDoc**: Use JSDoc for complex utility functions to explain params and return values.
